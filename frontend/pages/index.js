import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './component/Header';
import ArticleTable from './component/Articletable';

const home = () => {
    const [articleData, setArticleData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get('https://software-practice-empirical-evidence-database.vercel.app/articles');
            
            // Filter the data based on modCheck and approve properties
            const filteredData = res.data.filter(article => article.approve);
            console.log(filteredData);
            // Update the state with the filtered data
            setArticleData(filteredData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            <Header/>
            <ArticleTable articleData={articleData}/>
        </div>
    );
}

export default home;