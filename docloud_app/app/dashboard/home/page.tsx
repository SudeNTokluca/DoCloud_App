import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faFolderOpen,faFile,faHourglassEnd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface DataItem {
  folderName: string;
  date: string;
  editedBy: string;
  type: string;
}

const data: DataItem[] = [
  { folderName: 'Folder 1', date: '2024-01-28', editedBy: 'User 1',type:'folder' },
  { folderName: 'Folder 2', date: '2024-01-29', editedBy: 'User 2',type:'folder'  },
  { folderName: 'File 1', date: '2024-01-29', editedBy: 'User 2',type:'file'  },
  { folderName: 'Folder 1', date: '2024-01-28', editedBy: 'User 1',type:'folder' },
  { folderName: 'Folder 2', date: '2024-01-29', editedBy: 'User 2',type:'folder'  },
  { folderName: 'File 1', date: '2024-01-29', editedBy: 'User 2',type:'file'  },
  { folderName: 'Folder 1', date: '2024-01-28', editedBy: 'User 1',type:'folder' },
  { folderName: 'Folder 2', date: '2024-01-29', editedBy: 'User 2',type:'folder'  },
  { folderName: 'File 1', date: '2024-01-29', editedBy: 'User 2',type:'file'  },
  { folderName: 'Folder 1', date: '2024-01-28', editedBy: 'User 1',type:'folder' },
 
 
];

const DashhomePage: React.FC = () => {
  return (
      <Container>
        {/*Başlık alanı */}
          <Row className='title' >
            <Col xs={6}>
              <h5 className='m-0 fw-bold'><FontAwesomeIcon icon={faHourglassEnd} className='mx-2 icons my-0'/>
              Recently Used</h5> 
            </Col>

            <Col xs={3} className='d-flex justify-content-center align-items-center'>
            <h6 className='m-0 fw-bold'>Date</h6>
            </Col>

            <Col xs={3}className='d-flex justify-content-center align-items-center'>
            <h6 className='m-0 fw-bold'>Edited By</h6>
            </Col>

          </Row>

          {/*İçerik alanı */}
          {data.map((item: DataItem, index: number) => (
          <Row key={index} className='p-2'>  
                <Col xs={6} className='file_names'>
                <FontAwesomeIcon icon={item.type === "folder" ? faFolderOpen : faFile} className='mx-2 file_icons'  />
                {item.folderName}
                </Col> 

                <Col xs={3} className='d-flex justify-content-center align-items-center'> 
                {item.date}
                </Col> 

                <Col xs={3} className='d-flex justify-content-center align-items-center'> 
                {item.editedBy}
                </Col> 
          </Row>))}
      </Container>
  );
}

export default DashhomePage;
