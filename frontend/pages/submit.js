// pages/submit.js
import { useState } from 'react';
import styles from './styles/submitStyles.module.css';
import Header from './component/Header';

const SubmitArticle = () => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [journal, setJournal] = useState('');
  const [year, setYear] = useState('');
  const [volume, setVolume] = useState('');
  const [number, setNumber] = useState('');
  const [pages, setPages] = useState('');
  const [doi, setDoi] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the submission, e.g., send the data to an API.
    const articleData = { title, authors, journal, year, volume, number, pages, doi };
    console.log('Article Data:', articleData);
  };

  return (
  <>
    <Header/>
    <div className={styles.container}>
      <h1>Submit an Article</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Authors:
          <input type="text" value={authors} onChange={(e) => setAuthors(e.target.value)} required />
        </label>
        <label>
          Journal Name:
          <input type="text" value={journal} onChange={(e) => setJournal(e.target.value)} required />
        </label>
        <label>
          Year of Publication:
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        </label>
        <label>
          Volume:
          <input type="text" value={volume} onChange={(e) => setVolume(e.target.value)} required />
        </label>
        <label>
          Number:
          <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} required />
        </label>
        <label>
          Pages:
          <input type="text" value={pages} onChange={(e) => setPages(e.target.value)} required />
        </label>
        <label>
          DOI:
          <input type="text" value={doi} onChange={(e) => setDoi(e.target.value)} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  </>
  );
};

export default SubmitArticle;
