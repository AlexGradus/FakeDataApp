import { s } from '.';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { faker } from '@faker-js/faker';
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {  useSelector } from 'react-redux';



function randomDatas(seedPage,lang,mistake,userNumber=1){
  if(lang){
    faker.locale = lang;
  }

   const[seed,page]=seedPage===0 ? [0,null] : seedPage.split('.');
   if(seed||seedPage===0){
    faker.seed(+seed)
    
   }
  
    const ConfirmedData = [];
    const amountOfUsers=page?page*20:20;

  
      for(let i=0;i<amountOfUsers;i++){
        const AdressTypeFirst = [faker.address.cityName(),faker.address.street(),faker.address.streetAddress()].join(' ');
        const AdressTypeSecond = [faker.address.cityName(),faker.address.buildingNumber()].join(' ');
        const adressStyle = (i%3===0||i%7===0||i%10===0)?AdressTypeSecond:AdressTypeFirst;
        const fakeDataRegulation = [faker.random.numeric(15).toString(),faker.name.fullName(),faker.name.middleName(),faker.address.state(),adressStyle,faker.phone.number().toString()]
        const amountOfMistakes=(i%2===0)?Math.floor(mistake):Math.ceil(mistake);

        const mistakeChoise = Number.isInteger(mistake)?mistake:amountOfMistakes;
       
        for(let j = 0;j< mistakeChoise;j++){
          const rardomDataNumber = faker.datatype.number({ min: 0, max: 5 })
          const rardomDataMistake = faker.datatype.number({ min: 0, max: 2 })

          switch (rardomDataMistake) {
            case 0:
              let str = fakeDataRegulation[rardomDataNumber].split('');
              if(str.length>3){
                const index = faker.datatype.number({ min: 0, max: (str.length-1) });
                str.splice(index, 1);
                str = str.join('');
                fakeDataRegulation[rardomDataNumber]=str;
              }
        
              break;
            case 1:
              
              let str1 = fakeDataRegulation[rardomDataNumber].split('');
              if(str1.length<20){
              const index1 = faker.datatype.number({ min: 0, max: (str1.length-1) });
              const randomLetter = faker.datatype.hexadecimal({ length: 1 })
              str1.splice(index1, 0, randomLetter);
              str1 = str1.join('');
              fakeDataRegulation[rardomDataNumber]=str1;
              }
              break;
              case 2:
                let str2 = fakeDataRegulation[rardomDataNumber].split('');
                const index2 = faker.datatype.number({ min: 0, max: (str2.length-1) });
                const tempSym = str2[index2+1];
                str2[index2+1]=str2[index2];
                str2.splice(index2-1, 0, tempSym);
              
  
                break;
            default:
              console.log('Mistake!');
          }


          
        }
        const fakeData={
          number: userNumber+i,
          id:fakeDataRegulation[0],
          fullname:fakeDataRegulation[1],
          middlename:fakeDataRegulation[2],
          addre:fakeDataRegulation[3],
          address:fakeDataRegulation[4],
          phoneNumber:fakeDataRegulation[5],
        };
        ConfirmedData.push(fakeData);

      }
    
    
    const finalUsersData=ConfirmedData.slice(-20);
    return finalUsersData;
   
  }
const columns = [
  {
    width: 50,
    label: 'Number',
    dataKey: 'number',
  },
  {
    width: 120,
    label: 'Id',
    dataKey: 'id',
  },
  {
    width: 120,
    label: 'Fullname',
    dataKey: 'fullname',
  },
  {
    width: 120,
    label: 'Middlename',
    dataKey: 'middlename',
  },
  {
    width: 200,
    label: 'Address',
    dataKey: 'address',
  },
  {
    width: 120,
    label: 'Phone Number',
    dataKey: 'phoneNumber',
  },
];



const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => <Table {...props} style={{ borderCollapse: 'separate' }} />,
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function FakeTable() {
  const Seed = useSelector((state)=>state.app.currentSeed);
  const Lang = useSelector((state)=>state.app.currentLang);
  const Mistake = useSelector((state)=>state.app.currentMistake);
  const [fakeUsers, setFakeUsers] = useState(randomDatas(Seed,Lang,Mistake));
  useEffect(() => {
   
    setFakeUsers(randomDatas(Seed,Lang,Mistake))
  },[Seed,Lang,Mistake]);
  
  
  const loadMore=()=>{
    setFakeUsers((fakeUsers)=>[...fakeUsers,...randomDatas(Seed,Lang,Mistake,fakeUsers.length+1)]);
  }
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        data={fakeUsers}
        endReached={loadMore}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
