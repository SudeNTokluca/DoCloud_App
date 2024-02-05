"use client"
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faFolderOpen,faFile,faMagnifyingGlass,faTrash,faCalendarDays,faArrowDownAZ,faArrowDownZA,faRotateRight,faBackward} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface DataItem {
  folderName: string;
  type: string;
  time: string;
}

const data: DataItem[] = [
  { folderName: 'Folder 15',type:'folder',time: '2024-01-01' },
  { folderName: 'Folder 2',type:'folder',time: '2024-02-01' },
  { folderName: 'Folder 3',type:'folder',time: '2024-01-05'  },
  { folderName: 'File 25',type:'file' ,time: '2024-01-05' },
  { folderName: 'Folder 3',type:'folder',time: '2024-01-07'  },
  { folderName: 'File 2',type:'file',time: '2024-01-15'  },
  { folderName: 'Folder 3',type:'folder',time: '2024-02-01'  },
  { folderName: 'Folder 32',type:'folder' ,time: '2024-02-01' },
  { folderName: 'File 2',type:'file' ,time: '2024-02-01' },
  { folderName: 'Folder 3',type:'folder',time: '2024-01-15'  },
  { folderName: 'File 2',type:'file' ,time: '2024-02-01' },
  { folderName: 'Folder 3',type:'folder',time: '2024-02-01'  },
  { folderName: 'Folder 5',type:'folder',time: '2024-02-01'  },
  { folderName: 'File 2',type:'file' ,time: '2024-02-01'  },
  { folderName: 'Folder 3',type:'folder' ,time: '2024-02-01' },
  { folderName: 'File 2',type:'file',time: '2024-02-01'  },
  { folderName: 'Folder 3',type:'folder',time: '2024-02-01'  },
  { folderName: 'Folder 3',type:'folder',time: '2024-02-01'  },
  { folderName: 'File 2',type:'file',time: '2024-02-01'  },
  { folderName: 'Folder 3',type:'folder',time: '2024-02-01'  },
  { folderName: 'File 2',type:'file' ,time: '2024-02-01' },
  { folderName: 'Folder 3',type:'folder',time: '2024-02-01'  },
];


const BinPage: React.FC = () => {

  const initialData = [...data]; 
  const [showCalendar, setShowCalendar] = useState(false);
  const [sortOrder, setSortOrder] = useState<'az' | 'za' | null>(null); 
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filteredData, setFilteredData] = useState<DataItem[]>(initialData); 
  const [searchTerm, setSearchTerm] = useState<string>('');

  //Refresh butonu ile çalışan filtreleme işlemlerini sıfırlayan fonk
  const handleRefreshClick = () => {
    setFilteredData(initialData); 
    setSortOrder(null); 
    setSelectedDate(null); 
    setSearchTerm(''); 
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
    <Container>
          {/* Başlık ve filtreleme-sıralama işlemleri alanı */}
          <Row className='title' >

            {/*Başlık alanı*/}
            <Col xs="auto" >
            <h5 className='m-0 fw-bold'> <FontAwesomeIcon icon={faTrash} className='mx-2 icons my-0'  /> Bin</h5>
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

          {/*İçerik alanı */}
          <div className='subContainer'>
          {filteredData.map((item: DataItem, index: number) => (
            <Row key={index} className='p-2'>
              <Col xs={10}>
                <FontAwesomeIcon icon={item.type === "folder" ? faFolderOpen : faFile} className='mx-2 file_icons' />
                {item.folderName}
              </Col>
              <Col xs={2} className='d-flex justify-content-center align-items-center'>
                <FontAwesomeIcon icon={faRotateRight} className='mx-2 file_icons' />
                <FontAwesomeIcon icon={faTrash} className='mx-2 file_icons' />
              </Col>
            </Row>))}
          </div>
    </Container>
  );
};

export default BinPage;