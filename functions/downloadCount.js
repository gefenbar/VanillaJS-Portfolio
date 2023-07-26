// const fs = require('fs');
// const path = require('path');

// const downloadCountFilePath = path.join(__dirname, 'downloadCount.json');

// let downloadCount = 0;

// function updateDownloadCountFile() {
//     fs.writeFileSync(downloadCountFilePath, JSON.stringify({ downloadCount }), 'utf8');
// }

// function readDownloadCountFile() {
//     try {
//         const data = fs.readFileSync(downloadCountFilePath, 'utf8');
//         const parsedData = JSON.parse(data);
//         downloadCount = parsedData.downloadCount || 0;
//     } catch (err) {
//         downloadCount = 0;
//         updateDownloadCountFile();
//     }
// }

// exports.handler = async function (event, context) {
//     if (event.httpMethod === 'GET') {
//         readDownloadCountFile();
//         downloadCount++;
//         updateDownloadCountFile();

//         return {
//             statusCode: 200,
//             body: JSON.stringify({ downloadCount }),
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Headers': 'Content-Type',
//             },
//         };
//     } else {
//         return {
//             statusCode: 405,
//             body: JSON.stringify({ message: 'Method Not Allowed' }),
//         };
//     }
// };
