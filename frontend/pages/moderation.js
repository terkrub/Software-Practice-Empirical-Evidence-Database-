import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './component/Header';
import ArticleTable from './component/Articletable';

const ModerationPage = () => {
    const [articleData, setArticleData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://software-practice-empirical-evidence-database.vercel.app/articles');
                
                // Filter the data based on modCheck and approve properties
                const filteredData = res.data.filter(article => !article.modCheck && !article.approve);
                console.log(filteredData);
                // Update the state with the filtered data
                setArticleData(filteredData);
            } catch (err) {
                console.log(err);
            }
        };
      
        fetchData();
    }, []);

    const handleApprove = async (article) => {
        console.log('Approved:', article);
        try {
            await axios.post(`https://software-practice-empirical-evidence-database.vercel.app/articles/${article._id}/modchecked`);
            // Optionally: Update UI to reflect the change
          } catch (err) {
            console.error('Error approving article:', err);
            // Optionally: Show error message to user
          }
    };

    const handleReject = (article) => {
        console.log('Rejected:', article);
        // Handle reject action (e.g., update data on server)
    };

    return (
        <>
            <Header/>
            <ArticleTable articleData={articleData} handleApprove={handleApprove} handleReject={handleReject}/>
        </>
    );
}

export default ModerationPage;
