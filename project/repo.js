// // Handle file upload and list display
// document.getElementById("file-upload-form").addEventListener("submit", function (event) {
//     event.preventDefault();
    
//     const fileInput = document.getElementById("file-upload");
//     const file = fileInput.files[0];

//     if (file) {
//         // Here, you'd typically upload the file to a server or cloud storage
//         // For now, we'll just simulate the process by adding the file to the file list

//         const fileList = document.querySelector(".files");

//         const fileItem = document.createElement("div");
//         fileItem.classList.add("file-item");

//         const fileName = document.createElement("span");
//         fileName.textContent = file.name;

//         const downloadBtn = document.createElement("a");
//         downloadBtn.textContent = "Download";
//         downloadBtn.classList.add("download-btn");
//         downloadBtn.href = URL.createObjectURL(file); // This creates a temporary URL for the file
//         downloadBtn.download = file.name;

//         fileItem.appendChild(fileName);
//         fileItem.appendChild(downloadBtn);
//         fileList.appendChild(fileItem);

//         // Clear the input after upload
//         fileInput.value = "";
//     }
// });







// script.js

// Mock data to represent uploaded files (will be replaced with actual file upload functionality)
// const uploadedFiles = [
//     { name: 'Document 1.pdf', url: '#', size: '1.5MB' },
//     { name: 'Presentation.pptx', url: '#', size: '3.2MB' },
//     { name: 'Report.docx', url: '#', size: '500KB' },
//   ];
  
//   // Function to display files in the file list
//   const displayFiles = () => {
//     const fileList = document.getElementById('file-list');
//     fileList.innerHTML = ''; // Clear the current file list
  
//     uploadedFiles.forEach(file => {
//       const fileItem = document.createElement('div');
//       fileItem.classList.add('file-item');
//       fileItem.innerHTML = `
//         <h3>${file.name}</h3>
//         <p>Size: ${file.size}</p>
//         <a href="${file.url}" download>Download</a>
//       `;
//       fileList.appendChild(fileItem);
//     });
//   };
  
//   // Function to handle file upload
//   const uploadFile = () => {
//     const fileInput = document.getElementById('file-input');
//     const file = fileInput.files[0];
  
//     if (file) {
//       // Simulate file upload by adding the file to the file list (Mock behavior)
//       uploadedFiles.push({
//         name: file.name,
//         url: '#', // The file URL would be set after a real upload to the server
//         size: `${(file.size / 1024 / 1024).toFixed(2)}MB`
//       });
  
//       displayFiles(); // Re-render the file list
//       fileInput.value = ''; // Clear the input after upload
//     } else {
//       alert('Please select a file to upload!');
//     }
//   };
  
//   // Event listener for upload button
//   document.getElementById('upload-btn').addEventListener('click', uploadFile);
  
//   // Initial file display
//   displayFiles();
  // script.js

// Mock data to represent uploaded files (will be replaced with actual file upload functionality)
const uploadedFiles = [
    { name: 'Document 1.pdf', url: '#', size: '1.5MB' },
    { name: 'Presentation.pptx', url: '#', size: '3.2MB' },
    { name: 'Report.docx', url: '#', size: '500KB' },
  ];
  
  // Function to display files in the file list
  const displayFiles = () => {
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = ''; // Clear the current file list
  
    uploadedFiles.forEach(file => {
      const fileItem = document.createElement('div');
      fileItem.classList.add('file-item');
      fileItem.innerHTML = `
        <h3>${file.name}</h3>
        <p>Size: ${file.size}</p>
        <a href="${file.url}" download>Download</a>
      `;
      fileList.appendChild(fileItem);
    });
  };
  
  // Function to handle file upload
  const uploadFile = () => {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
  
    if (file) {
      // Simulate file upload by adding the file to the file list (Mock behavior)
      uploadedFiles.push({
        name: file.name,
        url: '#', // The file URL would be set after a real upload to the server
        size: `${(file.size / 1024 / 1024).toFixed(2)}MB`
      });
  
      displayFiles(); // Re-render the file list
      fileInput.value = ''; // Clear the input after upload
    } else {
      alert('Please select a file to upload!');
    }
  };
  
  // Event listener for upload button
  document.getElementById('upload-btn').addEventListener('click', uploadFile);
  
  // Initial file display
  displayFiles();
  