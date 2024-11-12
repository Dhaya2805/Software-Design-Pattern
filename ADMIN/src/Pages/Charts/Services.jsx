import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AdminService = () => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ name: '', title: '', company: '', quote: '' });
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        console.log("usestate");
        fetchReviews();
    });

    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/stories');
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleEdit = (index) => {
        setNewReview(reviews[index]);
        setEditIndex(index);
    };

    const handleDelete = async (index) => {
        try {
            const reviewToDelete = reviews[index];
            await axios.delete(`http://localhost:5000/api/stories/${reviewToDelete.id}`);
            const updatedReviews = [...reviews];
            updatedReviews.splice(index, 1);
            setReviews(updatedReviews);
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ marginBottom: '20px' }}>Admin Service Page</h2>
           
            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginBottom: '20px',
                }}
            >
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '10px', backgroundColor: '#f2f2f2' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px', backgroundColor: '#f2f2f2' }}>Title</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px', backgroundColor: '#f2f2f2' }}>Company</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px', backgroundColor: '#f2f2f2' }}>Quote</th>
                        <th style={{ border: '1px solid #ddd', padding: '10px', backgroundColor: '#f2f2f2' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review, index) => (
                        <tr key={review.id}>
                            <td style={{ border: '1px solid #ddd', padding: '10px' }}>{review.name}</td>
                            <td style={{ border: '1px solid #ddd', padding: '10px' }}>{review.title}</td>
                            <td style={{ border: '1px solid #ddd', padding: '10px' }}>{review.company}</td>
                            <td style={{ border: '1px solid #ddd', padding: '10px' }}>{review.quote}</td>
                            <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                                <EditIcon
                                    onClick={() => handleEdit(index)}
                                    style={{ cursor: 'pointer', color: '#3f51b5', marginRight: '10px' }}
                                />
                                <DeleteIcon
                                    onClick={() => handleDelete(index)}
                                    style={{ cursor: 'pointer', color: '#f44336' }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminService;
