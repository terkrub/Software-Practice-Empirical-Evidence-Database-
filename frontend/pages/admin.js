import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './component/Header';
import ArticleTable from './component/Articletable';
import AdminArticleTable from './component/AdminArticletable';

const ModerationPage = () => {
    const [articleData, setArticleData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get('https://software-practice-empirical-evidence-database.vercel.app/articles');
            
            setArticleData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleApprove = async (article) => {
        console.log('Approved:', article);
        try {
            await axios.post(`https://software-practice-empirical-evidence-database.vercel.app/articles/${article._id}/modchecked`);
            // Optionally: Update UI to reflect the change
            fetchData();

            alert("Article Approved")
          } catch (err) {
            console.error('Error approving article:', err);
            // Optionally: Show error message to user
          }
    };

    const handleReject = async (article) => {
        console.log('Rejected:', article);
        try {
            await axios.post(`https://software-practice-empirical-evidence-database.vercel.app/articles/${article._id}/reject`);
            fetchData();
            
            alert("Article reject")
            // Optionally: Update UI to reflect the change
          } catch (err) {
            console.error('Error approving article:', err);
            // Optionally: Show error message to user
          }
    };

    return (
        <>  
            <Header/>
            <AdminArticleTable articleData={articleData} handleApprove={handleApprove} handleReject={handleReject}/>
        </>
    );
}

export default ModerationPage;
