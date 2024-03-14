import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const FormReg = () => {
    const [formData, setFormData] = useState({
        movieName: '',
        userId: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            // Check if required fields are present
            if (!formData.movieName || !formData.userId) {
                console.error('Error: movieName and userId are required');
                return;
            }

            // Send POST request to your server
            const response = await axios.post('http://localhost:4040/api/v1/formEntry', formData);
            console.log(response); // Log the response from the server
            // Optionally, reset the form after successful submission
            setFormData({
                movieName: '',
                userId: ''
            });
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };

    const handleDownloadClick = async () => {
        // Show SweetAlert form for download
        const { value: formValues } = await Swal.fire({
            title: 'Download',
            html:
                '<input id="swal-input1" class="swal2-input" name="movieName" placeholder="Movie Name" required>' +
                '<input id="swal-input2" class="swal2-input" name="userId" placeholder="User ID" required>',
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ];
            }
        });
    
        if (formValues && formValues[0] && formValues[1]) {
            
            setFormData({
                movieName: formValues[0],
                userId: formValues[1]
            });
        
            handleSubmit();
        } else {
            console.error('Error: movieName and userId are required');
        }
    };
    

    return (
        <div>
            <button onClick={handleDownloadClick}>Download</button>
        </div>
    );
};

export default FormReg;
