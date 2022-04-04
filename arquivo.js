const fs = require('fs');

const createHeadersForTable= () => {
  return ['Id', 'Name', 'Age'];
}

const createValuesforTable = () => {
  const columnValues = [
    {
      id: 1,
      name: 'Leonardo',
      age: 24
    },
    {
      id: 2,
      name: 'User 2',
      age: 22
    },
    {
      id: 3,
      name: 'User 3',
      age: 25
    }
  ]
  return columnValues
}

const writeToCSV = async () => {
  const headersOfTable = createHeadersForTable();
  const valuesOfTable = createValuesforTable();

  const writeStream = fs.createWriteStream('out.csv');
  writeStream.write(headersOfTable.join(';'));
  
  for (const value of valuesOfTable) {
    const overWatermark = writeStream.write(`\n${value.id};${value.name};${value.age}`);
    if (!overWatermark) {
      await new Promise((resolve) => writeStream.once('drain', resolve));
    }
  }
  writeStream.end();
}

writeToCSV()
console.log("Write to CSV successfully");