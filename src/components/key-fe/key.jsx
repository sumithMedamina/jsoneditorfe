import React, { useState } from 'react';

function Key() {
    const [apiUrl, setApiUrl] = useState('http://localhost:8888/user/');
    const [saveApiUrl, setSaveApiUrl] = useState('http://localhost:8080/api/userdata');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [consoleData, setConsoleData] = useState('');

    const handleApiUrlChange = (event) => {
        setApiUrl(event.target.value);
    };

    const handleSaveApiUrlChange = (event) => {
        setSaveApiUrl(event.target.value);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(Object.entries(result).map(([key, value]) => ({ key, value })));
            setConsoleData(JSON.stringify(result, null, 2));
            setFetched(true);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data from the API.');
        } finally {
            setLoading(false);
        }
    };

    const handleConsoleDataChange = (event) => {
        setConsoleData(event.target.value);
    };

    const handleSaveConsoleData = async () => {
        try {
            const parsedData = JSON.parse(consoleData);
            const response = await fetch(saveApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedData),
            });

            if (response.ok) {
                alert('Data saved successfully!');
            } else {
                alert('Failed to save data.');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Failed to save data.');
        }
    };

    return (
        <div className="container">
            <div className="mb-3">
                <label className="form-label">API URL:</label>
                <input
                    type="text"
                    className="form-control"
                    value={apiUrl}
                    onChange={handleApiUrlChange}
                />
                <button
                    className="btn btn-primary mt-2"
                    onClick={fetchData}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Fetch Data'}
                </button>
            </div>

            <div className="mb-3">
                <label className="form-label">Save API URL:</label>
                <input
                    type="text"
                    className="form-control"
                    value={saveApiUrl}
                    onChange={handleSaveApiUrlChange}
                />
            </div>

            {fetched && (
                <div>
                    <div className="mt-3">
                        <h3>Console Output:</h3>
                        <textarea
                            value={consoleData}
                            onChange={handleConsoleDataChange}
                            className="form-control"
                            style={{ height: '200px' }}
                        />
                        <button
                            className="btn btn-primary mt-2"
                            onClick={handleSaveConsoleData}
                        >
                            Save Console Data
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Key;
