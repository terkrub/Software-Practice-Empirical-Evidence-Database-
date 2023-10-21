import React, { useState } from 'react';
import stylesComponet from './stylesComponet/articleTableStyles.module.css';
import axios from 'axios';
import PropTypes from 'prop-types';



const AdminArticleTable = ({ articleData, handleApprove, handleReject, mod, fetchData }) => {
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [authorSearchTerm, setAuthorSearchTerm] = useState('');
    const [editedArticleIndex, setEditedArticleIndex] = useState(null);
    const [selectedMedthod, setSelectedMedthod] = useState('');
    const [selectedResearch, setResearch] = useState('');
    const [selectedYearRange, setSelectedYearRange] = useState('');
    const [showmod, setShowmod] = useState(false);

    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [journalName, setJournalName] = useState('');
    const [yearOfPublication, setYearOfPublication] = useState('');
    const [volume, setVolume] = useState('');
    const [number, setNumber] = useState('');
    const [pages, setPages] = useState('');
    const [doi, setDoi] = useState('');
    const [SE_practice, setSE_practice] = useState('');
    const [claim, setclaim] = useState('');
    const [result_of_evidence, setresult_of_evidence] = useState('');
    const [type_of_research, settype_of_research] = useState('');
    
    const startEdit =(article)=>{
        setEditedArticleIndex(article._id)
        setTitle(article.title)
        setAuthors(article.authors.join(', '))
        setJournalName(article.journalName)
        setYearOfPublication(article.yearOfPublication)
        setVolume(article.volume)
        setNumber(article.number)
        setPages(article.pages)
        setDoi(article.doi)
        setSE_practice(article.SE_practice? article.SE_practice:'')
        setclaim(article.claim? article.claim:'')
        setresult_of_evidence(article.result_of_evidence? article.result_of_evidence:'')
        settype_of_research(article.type_of_research? article.type_of_research:'')

    }

    const clearFilters = () => {
        setSearchTerm('');
        setAuthorSearchTerm('');
        setSelectedYear('');
        setSelectedMedthod('');
    };

    const getSortSymbol = (field) => {
        if (sortField !== field) return '';
        return sortOrder === 'asc' ? '↑' : '↓';
    };
    
    const filteredData =articleData ? articleData.filter(article => {
        const titleMatch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
        const journalMatch = article.journalName.toLowerCase().includes(searchTerm.toLowerCase());
        const authorMatch = article.authors.some(author => author.toLowerCase().includes(authorSearchTerm.toLowerCase()));
        const yearMatch = selectedYearRange 
        ? (
            article.yearOfPublication >= parseInt(selectedYearRange.split('-')[0]) &&
            article.yearOfPublication <= parseInt(selectedYearRange.split('-')[1])
        )
        : true;
        const medthodMatch = selectedMedthod ? article.SE_practice == selectedMedthod: true;
        const researchMatch = selectedResearch ? article.type_of_research == selectedResearch: true;

        return (titleMatch || journalMatch) && authorMatch && yearMatch && medthodMatch && researchMatch;
    }):[];

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortField) return 0;

        if (typeof a[sortField] === 'string') {
            if (sortOrder === 'asc') {
                return a[sortField].localeCompare(b[sortField]);
            } else {
                return b[sortField].localeCompare(a[sortField]);
            }
        } else {
            if (sortOrder === 'asc') {
                return a[sortField] - b[sortField];
            } else {
                return b[sortField] - a[sortField];
            }
        }
    });

    const sortableColumnStyle = {
        cursor: 'pointer',
    };

    const handleSave =async ()=>{
        const updateData = {
            title: title,
            authors: authors,
            journalName: journalName,
            yearOfPublication: yearOfPublication,
            volume: volume,
            number: number,
            pages: pages,
            doi: doi,
            SE_practice: SE_practice,
            claim:claim,
            result_of_evidence: result_of_evidence,
            type_of_research:type_of_research
        }

        try {
            await axios.post(`https://software-practice-empirical-evidence-database.vercel.app/articles/${article._id}/modchecked`);
            const res = await axios.post(`https://software-practice-empirical-evidence-database.vercel.app/articles/${editedArticleIndex}/update`,{article: updateData});
            console.log(res)
            handleApprove(editedArticleIndex)
            alert("Article updated successful")
            setEditedArticleIndex(null)
            fetchData()
          } catch (err) {
            console.log(err);
          }
        
    }
    const handledelete =async (article)=>{
        try {
            await axios.post(`https://software-practice-empirical-evidence-database.vercel.app/articles/${article._id}/delete`);
            alert("Delete Article successful")
            fetchData()
          } catch (err) {
            console.log(err);
          }
    }

    const medthod =articleData? [...new Set(articleData.map(article => article.SE_practice))].sort():[];
    const research = articleData?[...new Set(articleData.map(article => article.type_of_research))].sort():[];

    const minYear = articleData? Math.min(...articleData.map(article => article.yearOfPublication)):0;
    const maxYear = articleData?Math.max(...articleData.map(article => article.yearOfPublication)):0;

    const generateYearRanges = (startYear, endYear, range = 5) => {
        let yearRanges = [];
        for (let i = startYear; i <= endYear; i += range) {
            yearRanges.push(`${i}-${i + range - 1}`);
        }
        return yearRanges;
    };
    
    const yearRanges = generateYearRanges(minYear, maxYear);
    

    return (
        <div className={stylesComponet.container}>
            <div className={stylesComponet.articleContainer}>
                <table className="table table-success table-striped">
                    <thead>
                        <tr>
                            <td colSpan="10">
                                <input 
                                    placeholder='Search' 
                                    value={searchTerm} 
                                    onChange={e => setSearchTerm(e.target.value)} 
                                />
                                <input 
                                    placeholder='Search Author' 
                                    value={authorSearchTerm} 
                                    onChange={e => setAuthorSearchTerm(e.target.value)} 
                                />
                                <select value={selectedYearRange} onChange={e => setSelectedYearRange(e.target.value)}>
                                    <option value=''>Select Year Range</option>
                                    {yearRanges.map(range => <option key={range} value={range}>{range}</option>)}
                                </select>

                                <select value={selectedMedthod} onChange={e => setSelectedMedthod(e.target.value)}>
                                    <option value=''>Select SE Medthod</option>
                                    {medthod.map(medthod => <option key={medthod} value={medthod}>{medthod}</option>)}
                                </select>
                                <select value={selectedResearch} onChange={e => setResearch(e.target.value)}>
                                    <option value=''>Select Research type</option>
                                    {research.map(research => <option key={research} value={research}>{research}</option>)}
                                </select>
                                <button onClick={clearFilters} className='btn btn-secondary'>Clear Filters</button></td>
                        </tr>
                        <tr>
                            <th onClick={() => handleSort('title')} style={sortableColumnStyle}>Title {getSortSymbol('title')}</th>
                            <th onClick={() => handleSort('authors')} style={sortableColumnStyle}>Authors {getSortSymbol('authors')}</th>
                            <th onClick={() => handleSort('journalName')} style={sortableColumnStyle}>Journal Name {getSortSymbol('journalName')}</th>
                            <th onClick={() => handleSort('yearOfPublication')} style={sortableColumnStyle}>Year of Publication {getSortSymbol('yearOfPublication')}</th>
                            <th onClick={() => handleSort('volume')} style={sortableColumnStyle}>Volume {getSortSymbol('volume')}</th>
                            <th onClick={() => handleSort('number')} style={sortableColumnStyle}>Number {getSortSymbol('number')}</th>
                            <th onClick={() => handleSort('pages')} style={sortableColumnStyle}>Pages {getSortSymbol('pages')}</th>
                            <th onClick={() => handleSort('doi')} style={sortableColumnStyle}>DOI {getSortSymbol('doi')}</th>
                            <th onClick={() => handleSort('modCheck')} style={sortableColumnStyle}>Mod Approve {getSortSymbol('modCheck')}</th>
                            <th onClick={() => handleSort('approve')} style={sortableColumnStyle}>In speed DB {getSortSymbol('approve')}</th>

                            <th onClick={() => handleSort('dateSubmitted')} style={sortableColumnStyle}>Date Submitted {getSortSymbol('dateSubmitted')}</th>

                            <th onClick={() => handleSort('isDuplicate')} style={sortableColumnStyle}>Is Duplicate {getSortSymbol('isDuplicate')}</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedData?sortedData.map((article, index) => (
                            <>
                            
                            <tr key={index}>
                                <td>{editedArticleIndex == article._id ? 
                                    <input value={title} onChange={e => setTitle(e.target.value)} /> :
                                    article.title
                                }</td>
                                <td>{editedArticleIndex == article._id ? 
                                    <input value={authors} onChange={e => setAuthors(e.target.value)} /> :
                                    article.authors.join(', ')
                                }</td>
                                <td>{editedArticleIndex == article._id ? 
                                    <input value={journalName} onChange={e => setJournalName(e.target.value)} /> :
                                    article.journalName
                                }</td>
                                <td>{editedArticleIndex == article._id ? 
                                    <input type="number" value={yearOfPublication} onChange={e => setYearOfPublication(e.target.value)} /> :
                                    article.yearOfPublication
                                }</td>
                                <td>{editedArticleIndex == article._id ? 
                                    <input type="number" value={volume} onChange={e => setVolume(e.target.value)} /> :
                                    article.volume}
                                </td>
                                <td>{editedArticleIndex == article._id ? 
                                    <input type="number" value={number} onChange={e => setNumber(e.target.value)} /> :
                                    article.number}
                                </td>
                                <td>{editedArticleIndex == article._id ? 
                                    <input type="number" value={pages} onChange={e => setPages(e.target.value)} /> :
                                    article.pages}
                                </td>
                                <td>{editedArticleIndex == article._id ? 
                                    <input value={doi} onChange={e => setDoi(e.target.value)} /> :
                                    article.doi}
                                </td>
                                <td>{article.modCheck ?'Yes':'No'}</td>
                                <td>{article.approve ? 'Yes' : 'No'}</td>
                                <td>{new Date(article.dateSubmitted).toLocaleDateString()}</td>
                                
                                <td>{article.isDuplicate ? 'Yes' : 'No'}</td>
                                
                                                                
                                <td>
                                    {editedArticleIndex == article._id ? 
                                    <>
                                        <button onClick={()=>{handleSave()}} className='btn btn-success'>Save</button>
                                        <button onClick={()=>{setEditedArticleIndex(null)}} className='btn btn-danger'>Cancel</button>
                                    </>:

                                  
                                    <div className="btn-group" role="group">
                                      <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Action
                                      </button>
                                      <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                      <li><button  onClick={()=>{handleReject(article)}} className='dropdown-item'>Move to reject table</button></li>
                                      <li>{!article.modCheck ? <button  onClick={()=>{handleApprove(article)}} className='dropdown-item'>Move to analysis queue</button>:""}</li>
                                      <li><button  onClick={()=>{startEdit(article)}} className='dropdown-item'>Edit</button></li>
                                      <li><button  onClick={()=>{handledelete(article)}} className='dropdown-item'>Delete</button></li>
                                    </ul>
                                    </div>

                                    
                                    
                                    }
                                </td>

                            </tr>
                            {editedArticleIndex == article._id ? 
                                    <td colSpan="100%">
                                        <div className={stylesComponet.editContainer} style={{
                                                    backgroundColor: '#F2ECEC',
                                                    width: '100%',
                                                    height: 'auto',
                                                    padding: '20px',
                                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                    borderRadius: '5px'}}
                                        >
                                            <label >Title: </label>
                                            <input value={title} onChange={e => setTitle(e.target.value)} />
                                            <label>Authors: </label>
                                            <input value={authors} onChange={e => setAuthors(e.target.value)} />
                                            <label>Journal Name: </label>
                                            <input value={journalName} onChange={e => setJournalName(e.target.value)} />
                                            <label>Year Of Publication: </label>
                                            <input type="number" value={yearOfPublication} onChange={e => setYearOfPublication(e.target.value)} />
                                            <label>Volume: </label>
                                            <input type="number" value={volume} onChange={e => setVolume(e.target.value)} /> 
                                            <label>Article number: </label>
                                            <input type="number" value={number} onChange={e => setNumber(e.target.value)} />
                                            <label>Pages: </label>
                                            <input type="number" value={pages} onChange={e => setPages(e.target.value)} />
                                            <label>DOI: </label>
                                            <input value={doi} onChange={e => setDoi(e.target.value)} />
                                            <label>SE practice: </label>
                                            <input value={SE_practice} onChange={e => setSE_practice(e.target.value)} />
                                            <label>Claim: </label>
                                            <input value={claim} onChange={e => setclaim(e.target.value)} />
                                            <label>Result of evidence: </label>
                                            <input value={result_of_evidence} onChange={e => setresult_of_evidence(e.target.value)} />
                                            <label>Type of research: </label>
                                            <input value={type_of_research} onChange={e => settype_of_research(e.target.value)} />
                                        </div>
                                    </td>
                            :""}
                            </>
                        )):""}
                    </tbody>
                    
                </table>
            </div>
        </div>
    );
}

AdminArticleTable.propTypes = {
    articleData: PropTypes.array.isRequired,
    handleApprove: PropTypes.func.isRequired,
    handleReject: PropTypes.func.isRequired,
    mod: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired
};

export default AdminArticleTable;
