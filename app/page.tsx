'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    setSummary('');
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      console.error(err);
      setSummary('Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <main className='max-w-2xl mx-auto p-6 flex justify-center items-center flex-col'>
      <h1 className='text-2xl font-bold mb-4'>AI Text Summarizer</h1>
      <textarea
        className='w-full h-40 p-4 border rounded mb-4'
        placeholder='Paste your text here...'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleSummarize}
        disabled={!text || loading}
        className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 w-full cursor-pointer'>
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {summary && (
        <div className='mt-6 dark:bg-black bg-gray-100 p-4 rounded w-full'>
          <h2 className='text-xl font-semibold mb-2'>Summary</h2>
          <div className='prose prose-sm dark:prose-invert'>
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        </div>
      )}
    </main>
  );
}
