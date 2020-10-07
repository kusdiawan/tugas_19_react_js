import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ModalPage(props){
	return(
		<Modal size="lg" centered show={props.modalShow} onHide={()=>props.setModalShow(true)}>
			<Modal.Header>
				<Modal.Title>Data Karyawan</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				Nama Karyawan <Form.Control value={props.dataState.inputNama} onChange={(e)=>props.handleInput('inputNama', e)} type="text" placeholder="Masukan Nama" />
				Jabatan <Form.Control value={props.dataState.inputJabatan} onChange={(e)=>props.handleInput('inputJabatan', e)} type="text" placeholder="Masukan Jabatan" />
				Jenis Kelamin <Form.Control value={props.dataState.inputGender} onChange={(e)=>props.handleInput('inputGender', e)} type="text" placeholder="Masukan Jenis Kelamin" />
				Tanggal Lahir<Form.Control value={props.dataState.inputDob} onChange={(e)=>props.handleInput('inputDob', e)} type="date" placeholder="Tanggal Lahir mm/dd/yyyy" />
			</Modal.Body>

			<Modal.Footer>
				<Button onClick={()=>props.closeModal()} variant="secondary">Close</Button>
				<Button onClick={()=>props.simpanData()} variant="success">Simpan</Button>
			</Modal.Footer>

		</Modal>
		)
} 

export default ModalPage;