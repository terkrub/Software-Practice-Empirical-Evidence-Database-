import React from 'react';

const ArticleTable = ({ articleData, handleApprove, handleReject}) => {

    
    return (
        <>
            <table border="1" cellPadding="8" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Authors</th>
                        <th>Journal Name</th>
                        <th>Year of Publication</th>
                        <th>Volume</th>
                        <th>Number</th>
                        <th>Pages</th>
                        <th>DOI</th>
                        <th>Date Submitted</th>
                        <th>Is Duplicate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articleData.map((article, index) => (
                        <tr key={index}>
                            <td>{article.title}</td>
                            <td>{article.authors.join(', ')}</td>
                            <td>{article.journalName}</td>
                            <td>{article.yearOfPublication}</td>
                            <td>{article.volume}</td>
                            <td>{article.number}</td>
                            <td>{article.pages}</td>
                            <td>{article.doi}</td>
                            <td>{new Date(article.dateSubmitted).toLocaleDateString()}</td>
                            <td>{article.isDuplicate ? 'Yes' : 'No'}</td>
                            <td>
                                <button onClick={()=>{handleApprove(article)}}>Approve</button>
                                <button onClick={()=>{handleReject(article)}}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ArticleTable;
