import React, { useState } from 'react';
import stylesComponet from './stylesComponet/articleTableStyles.module.css';
import axios from 'axios';

const ArticleTable = ({ articleData, handleApprove, handleReject, mod, fetchData }) => {
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [authorSearchTerm, setAuthorSearchTerm] = useState('');
    const [editedArticleIndex, setEditedArticleIndex] = useState(null);

    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [journalName, setJournalName] = useState('');
    const [yearOfPublication, setYearOfPublication] = useState('');
    const [volume, setVolume] = useState('');
    const [number, setNumber] = useState('');
    const [pages, setPages] = useState('');
    const [doi, setDoi] = useState('');
    
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

    }

    const clearFilters = () => {
        setSearchTerm('');
        setAuthorSearchTerm('');
        setSelectedYear('');
    };

    const getSortSymbol = (field) => {
        if (sortField !== field) return '';
        return sortOrder === 'asc' ? '↑' : '↓';
    };
    
    const filteredData = articleData.filter(article => {
        const titleMatch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
        const journalMatch = article.journalName.toLowerCase().includes(searchTerm.toLowerCase());
        const authorMatch = article.authors.some(author => author.toLowerCase().includes(authorSearchTerm.toLowerCase()));
        const yearMatch = selectedYear ? article.yearOfPublication == selectedYear : true;

        return (titleMatch || journalMatch) && authorMatch && yearMatch;
    });

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
        }

        try {
            const res = await axios.post(`https://software-practice-empirical-evidence-database.vercel.app/articles/${editedArticleIndex}/update`,{article: updateData});
            console.log(res)
            alert("Article updated successful")
            setEditedArticleIndex(null)
            fetchData()
          } catch (err) {
            console.log(err);
          }
        
    }

    const uniqueYears = [...new Set(articleData.map(article => article.yearOfPublication))].sort();

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
                                <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                                    <option value=''>Select Year</option>
                                    {uniqueYears.map(year => <option key={year} value={year}>{year}</option>)}
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
                            {handleApprove && handleReject &&
                                <th onClick={() => handleSort('dateSubmitted')} style={sortableColumnStyle}>Date Submitted {getSortSymbol('dateSubmitted')}</th>}
                            {handleApprove && handleReject &&
                                <th onClick={() => handleSort('isDuplicate')} style={sortableColumnStyle}>Is Duplicate {getSortSymbol('isDuplicate')}</th>}
                            {handleApprove && handleReject &&
                                <th>Actions</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {sortedData.map((article, index) => (
                            
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
                                {handleApprove && handleReject &&<td>{new Date(article.dateSubmitted).toLocaleDateString()}</td>}
                                {handleApprove && handleReject &&
                                <td>{article.isDuplicate ? 'Yes' : 'No'}</td>}
                                {handleApprove && handleReject && mod &&
                                <td>
                                    <button onClick={()=>{handleApprove(article)}} className='btn btn-success'>Approve</button>
                                    <button onClick={()=>{handleReject(article)}} className='btn btn-danger'>Reject</button>
                                </td>}

                                {handleApprove && handleReject && !mod &&
                                <td>
                                    {editedArticleIndex == article._id ? 
                                    <>
                                        <button onClick={()=>{handleSave()}} className='btn btn-success'>Save</button>
                                        <button onClick={()=>{setEditedArticleIndex(null)}} className='btn btn-danger'>Cancel</button>
                                    </>:
                                    <div className="btn-group" role="group">
                                        <button id="btnGroupDrop1" type="button" className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" >
                                            Actions
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                            <li><a className="dropdown-item text-success" onClick={()=>{handleApprove(article)}}>Approve</a></li>
                                            <li><a className="dropdown-item text-warning" onClick={()=>{startEdit(article)}}>Edit</a></li>
                                            <li><a className="dropdown-item text-danger" onClick={()=>{handleReject(article)}}>Reject</a></li>
                                        </ul>
                                    </div>
                                    }
                                </td>}

                            </tr>
                        ))}
                    </tbody>
                    
                </table>
            </div>
        </div>
    );
}

export default ArticleTable;
