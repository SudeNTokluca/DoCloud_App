"use client"
import React,{useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faCloudArrowDown,faCloud,faCloudArrowUp} from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface DosyaYuklemeAlanıProps {
  onDosyaYukleme: (dosyalar: File[]) => void;
}

const AddFilePage: React.FC<DosyaYuklemeAlanıProps> = ({ onDosyaYukleme }) => {
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);

  const handleDosyaYukleme = async (acceptedFiles: File[]) => {
    onDosyaYukleme(acceptedFiles);

    // Dosyaları proje klasörüne yükleyerek kaydet
    const uploadedFiles = await uploadFiles(acceptedFiles);
    setUploadingFiles(uploadedFiles);
  };

  const uploadFiles = async (files: File[]): Promise<string[]> => {
    const uploadedFileNames: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          uploadedFileNames.push(result.fileName);
        }
      } catch (error) {
        console.error('Dosya yüklenirken bir hata oluştu:', error);
      }
    }

    return uploadedFileNames;
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDosyaYukleme,
  });

  return (
    <Container>
    <Row className='title ' xs="auto">
      <Col xs={6} >
      <h5 className='m-0 fw-bold'> <FontAwesomeIcon icon={faPlus} className='mx-2 icons my-0'  /> Add New File</h5>
      </Col>
    </Row>
    <Row className='d-flex justify-content-center align-items-center'>
      <div {...getRootProps()} className='dosyaYuklemeAlani'>
          <input {...getInputProps()} />
          {isDragActive ? (
            <div>
            <h6 className='purple fw-bold'>Drag and Drop File!</h6>
            <FontAwesomeIcon icon={faCloudArrowUp} className='icon-download' beat />
            </div>
          ) : (
            <div>
            <h6 className='purple fw-bold'>Select Or Drag File !</h6>
            <FontAwesomeIcon icon={faCloudArrowUp} className='icon-download' beat />
            </div>
          )}
      </div>


    </Row>
    <Row className='title 'xs="auto">
      <Col xs={6} >
      <h5 className='m-0 fw-bold'> <FontAwesomeIcon icon={faCloudArrowDown} className='mx-2 icons my-0'  /> Downloading</h5>
      </Col>

      {uploadingFiles.map((fileName) => (
    <div key={fileName}>
      <span>{fileName}</span>
      <progress value={100} max={100}></progress>
    </div>
  ))}
    </Row>
    <Row className='d-flex flex-wrap'>


      
    </Row>
    <Row className='title'xs="auto" >
      <Col xs={6} >
      <h5 className='m-0 fw-bold'> <FontAwesomeIcon icon={faCloud} className='mx-2 icons my-0'  /> Added Files</h5>
      </Col>

      {uploadingFiles.map((fileName) => (
    <div key={fileName}>
      <span>{fileName}</span>
    </div>
  ))}
    </Row>
    <Row className='d-flex flex-wrap'>


      
    </Row>
</Container>
  );

}

export default AddFilePage;
