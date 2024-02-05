"use client"
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faFolderOpen,faFile,faMagnifyingGlass,faStar,faCalendarDays,faArrowDownAZ,faArrowDownZA,faBackward} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface DataItem {
  id: number;
  folderName: string;
  type: string;
  starred: boolean;
  time:string;
}

const data: DataItem[] = [
  {id:1 ,folderName: 'Folder 1',type:'folder', starred:true,time: '2024-01-01'},
  {id:2, folderName: 'Folder 2',type:'folder', starred:true,time: '2024-01-01'},
  {id:3 ,folderName: 'Folder 3',type:'folder', starred:true ,time: '2024-01-15'},
  {id:4 ,folderName: 'File 4',type:'file', starred:true,time: '2024-01-01'},
  {id:5 ,folderName: 'Folder 5',type:'folder', starred:true,time: '2024-01-01'},
  {id:6 ,folderName: 'File 6',type:'file', starred:true,time: '2024-01-01'},
  {id:7 ,folderName: 'Folder 7',type:'folder' , starred:true ,time: '2024-01-15'},
  {id:8 ,folderName: 'Folder 8',type:'folder' , starred:true,time: '2024-01-01'},
  {id:9 ,folderName: 'File 9',type:'file' , starred:true,time: '2024-01-01'},
  {id:10 ,folderName: 'File 10',type:'file', starred:true ,time: '2024-01-01'},
  {id:11 ,folderName: 'Folder 11',type:'folder' , starred:true,time: '2024-01-01'},
  {id:12 ,folderName: 'Folder 12',type:'folder' , starred:true,time: '2024-01-15'},
  {id:13 ,folderName: 'File 13',type:'file' , starred:true,time: '2024-01-01'},
  {id:14 ,folderName: 'File 14',type:'file', starred:true  ,time: '2024-01-01'},
  {id:15 ,folderName: 'Folder 15',type:'folder' , starred:true,time: '2024-01-09'},
  {id:16 ,folderName: 'Folder 16',type:'folder' , starred:true,time: '2024-01-01'},
  {id:17 ,folderName: 'File 17',type:'file' , starred:true ,time: '2024-01-09'},
];


const StarredPage: React.FC = () => {

  const initialData = [...data]; 
  const [showCalendar, setShowCalendar] = useState(false);
  const [sortOrder, setSortOrder] = useState<'az' | 'za' | null>(null); 
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filteredData, setFilteredData] = useState<DataItem[]>(initialData); 
  const [searchTerm, setSearchTerm] = useState<string>('');
  const IdList: number[] = [] ; 


  //Yıldızlama veya yıldız kaldırma işlemlerini gerçekleştiren fonk
  const handleStarClick = (id: number) => {
    setFilteredData((prevData) => {
      const newData = prevData.map((item) =>
        item.id === id ? { ...item, starred: !item.starred } : item
      );
  
      // Eğer yıldız kaldırıldıysa, öğenin id'sini listeye ekle
      const removedItem = newData.find((item) => item.id === id);
      if (removedItem && !removedItem.starred) {
        if (!IdList.includes(id)) {
          IdList.push(id);
        }
      }
      console.log(IdList)
    
      return newData;
    });
  };
  

    //Refresh butonu ile çalışan filtreleme işlemlerini sıfırlayan fonk
    const handleRefreshClick = () => {
      setFilteredData(initialData); 
      setSortOrder(null); 
      setSelectedDate(null); 
      setSearchTerm('');  
      /*setFilteredData((prevFilteredData) =>
      prevFilteredData.filter((item) => !IdList.includes(item.id))
    );
      IdList.length = 0;*/
    };
  
    //Takvim iconuna tıklandığında çalışan ve takvimin gösterilmesini kontrol eden fonk
    const handleCalendarClick = () => {
      setShowCalendar(!showCalendar);
    };
  
    //Seçilen tarihe göre dosya filtreleme işlemi yapan fonk
    const handleDateChange = (date: Date | null) => {
      setSelectedDate(date);
      setShowCalendar(false);
    
      const filteredDatanew = filteredData.filter(item => {
        const itemDate = new Date(item.time);
        return date ? itemDate.toLocaleDateString() === date.toLocaleDateString() : true;
      });
    
      setFilteredData(filteredDatanew);
    };
    
    // Tıklanan icona göre a'dan z'ye veya tersine şeklinde dosyaları sıralayan fonk
    const handleSortClick = (order: 'az' | 'za') => {
      
      setSortOrder((prevOrder) => (prevOrder === order ? (order === 'az' ? 'za' : 'az') : order));
  
      const sortedData = [...filteredData].sort((a, b) => {
        if (order === 'az') {
          return a.folderName.localeCompare(b.folderName);
        } else {
          return b.folderName.localeCompare(a.folderName);
        }
      });
  
      setFilteredData(sortedData);
    };
  
    //Girilen inputa göre dosya filtreleme
    const handleSearchChange = (term: string) => {
  
      const filteredDatanew = filteredData.filter(item =>
        item.folderName.toLowerCase().includes(term.toLowerCase())
      );
  
      setFilteredData(filteredDatanew);
      setSearchTerm(term);
    };

  
  return (
    <Container >
          {/*Başlık alanı*/}
          <Row className='title' >

            <Col xs='auto' >
              <h5 className='m-0 fw-bold'> <FontAwesomeIcon icon={faStar} className='mx-2 icons my-0'  /> Starred</h5>
            </Col>

           {/*Takvimden seçilen güne göre filtreleme ve alfabetik sıralama alanı*/}
            <Col className='d-flex justify-content-center align-items-center p-0' >
                <div className="calendar-popup">
                  <FontAwesomeIcon icon={faCalendarDays} className={`mx-2 icons my-0`} onClick={handleCalendarClick} />
                  {showCalendar && (
                  <div className="calendar-modal">
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      inline />
                  </div>)}
                </div>

                <FontAwesomeIcon icon={faArrowDownAZ}
                className={`mx-2 icons my-0 ${sortOrder === 'az' ? 'active' : ''}`}
                onClick={() => handleSortClick('az')} />

                <FontAwesomeIcon icon={faArrowDownZA} 
                className={`mx-2 icons my-0 ${sortOrder === 'za' ? 'active' : ''}`}
                onClick={() => handleSortClick('za')} />
                
                <FontAwesomeIcon icon={faBackward} className='mx-2 icons my-0 ' onClick={handleRefreshClick}/>

            </Col>

            {/*Girilen inputa göre filtreleme yapılan alan*/}
            <Col xs={3} className='d-flex justify-content-center align-items-center'>
              <input
                type="text"
                className='search-input'
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} className='mx-2 icons my-0' size='xl' />
            </Col>
          </Row>

          {/*İçerik alanı*/}
          <div className='subContainer'>
              {filteredData.map((item: DataItem) => (
              <Row key={item.id} className='p-2'>  

                <Col xs={10}>
                  <FontAwesomeIcon icon={item.type === "folder" ? faFolderOpen : faFile} className='mx-2 file_icons'  />
                  {item.folderName}
                </Col> 

                <Col xs={2} className='d-flex justify-content-end align-items-center'> 
                    <Button onClick={() => handleStarClick(item.id)} 
                    className='star-icon'
                    >
                      {!item.starred ? (
                        <FontAwesomeIcon icon={farStar } beat className="mx-2 file_icons" />
                      ) : (
                        <FontAwesomeIcon icon={faStar} className="mx-2 file_icons" />
                      )}
                    </Button>
                </Col> 
              </Row>
            ))}
          </div>
    </Container>
  );
};

export default StarredPage;
