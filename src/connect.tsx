import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface YourItem {
  _id: number;
  Descriptions: string;
  // Add other properties based on your actual API response structure
}

const YourComponent: React.FC = () => {
  const [data, setData] = useState<YourItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestBody = {
          collection: "database_collection",
          database: "database",
          dataSource: "Cluster01",
          projection: {
            _id: 1,
            Descriptions: 1
          }
        };

        const response: AxiosResponse<YourItem[]> = await axios.post('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-vkjka/endpoint/data/v1/action/find', requestBody, {
          headers: {
            'Content-Type': 'application/json', 
            'Access-Control-Request-Headers': '*', 
            'api-key':'unqGVM6Xy0ibEeUQJFrxoPi6zZxrC9ej3rA0YNh8zzCLzBMfCcrKtZwo3VDLnFbJ',
            'Accept':'application/json'
          },
        });

        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect will only run once when the component mounts

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data && data.map(item => (
            <li key={item._id}>{item.Descriptions}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YourComponent;
