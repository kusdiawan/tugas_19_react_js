import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import ModalPage from './ModalPage';

class Body extends Component{
	constructor(props){
		super(props)
		this.state={
			dataKaryawan: [],
			valueSearch: '',
			inputNama: '',
			inputJabatan: '',
			inputGender: '',
			inputDob: '',
			idInput: ''
		}
		this.panggilSemua = this.panggilSemua.bind(this)
		this.panggilById = this.panggilById.bind(this)
		this.search = this.search.bind(this)
		this.hapusData = this.hapusData.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.handleInput = this.handleInput.bind(this)
		this.clearInput = this.clearInput.bind(this)
		this.simpanData = this.simpanData.bind(this)
	}

	panggilById(id){
		fetch(`http://localhost:3000/data-karyawan/${id}`)
		.then((response)=> response.json())
		.then((hasil =>{
			this.props.setModalShow(true)
			this.setState(
			{
				inputNama: hasil.nama_karyawan,
				inputJabatan: hasil.jabatan,
				inputGender: hasil.jenis_kelamin,
				inputDob: hasil.tanggal_lahir,
			})
		})) 
	}

	simpanData(){
		if (this.state.inputNama === "" || this.state.inputJabatan === "" || this.state.inputGender === "" || this.state.inputDob === ""){

		alert("Silakan isi data Karyawan terlebih dahulu....")
		}else if(this.state.idInput === ""){
			fetch(`http://localhost:3000/data-karyawan`, {
				method:'POST',
				body: JSON.stringify({
					nama_karyawan: this.state.inputNama,
					jabatan: this.state.inputJabatan,
					jenis_kelamin: this.state.inputGender,
					tanggal_lahir: this.state.inputDob,
				}),
				headers:{
					'Content-type': 'application/json; charset=UTF-8',
				},
			}).then((response)=>response.json())
			  .then((result=>{
			  	  this.closeModal()
			  	  this.panggilSemua()
			  }))
		}else{
			fetch(`http://localhost:3000/data-karyawan/${this.state.idInput}`,{
				method: 'PUT',
				body: JSON.stringfy({
					nama_karyawan:this.state.inputNama,
					jabatan: this.state.inputJabatan,
					jenis_kelamin: this.state.inputGender,
					tanggal_lahir: this.state.inputDob,
				}),
				headers:{
					'Content-type': 'application/json; charset=UTF-8',	
				},
			}).then((response) => response.json())
			  .then((hasil =>{
			  	this.panggilSemua();
			  	this.props.setModalShow(false);
			  	this.clearInput();
			  }))
		}
	}

	handleInput(value, e){
		this.setState({[value]: e.target.value})
	}


	closeModal(){
		this.props.setModalShow(false)
		this.clearInput()
	}


	clearInput(){
		this.setState(
		{
			inputNama: '',
			inputJabatan: '',
			inputGender: '',
			inputDob: '',
			idInput: ''
		}
		)
	}

	hapusData(id){
		fetch(`http://localhost:3000/data-karyawan/${id}`, {method:'DELETE',}).then((response=>{
			alert('Data sudah terhapus .....')
			this.panggilSemua()
		}))
	}

	search(e){
		this.setState({valueSearch: e.target.value})
	}


	panggilSemua(){
		fetch(`http://localhost:3000/data-karyawan`)
		.then((response)=> response.json())
		.then((hasil)=> this.setState({dataKaryawan: hasil}))
	}

	
	componentDidMount(){
		this.panggilSemua()
	}

	render(){
		console.log(this.state.valueSearch)
		return(
			<Container>
			<ModalPage
			modalShow={this.props.modalShow}
			setModalShow={this.props.setModalShow}
			closeModal={this.closeModal}
			handleInput={this.handleInput}
			dataState={this.state}
			simpanData={this.simpanData}  
			/>
			<Row style={{marginTop: '20px'}}>
			<Col lg={12} style={{width: 50, height: 50, backgroundColor: 'powderblue'}}><h1 align="center">DATA KARYAWAN</h1></Col>
			</Row> 

			<Row style={{marginTop: '30px'}}>
			<Col>Cari Data Karyawan</Col>
			<Col lg={8}>
				<Form.Control type="text" placeholder="cari gambar" value={this.state.valueSearch} onChange={(e)=>this.search(e)}></Form.Control>
			</Col>
			
			<Col lg={2}>
			    <Button onClick={()=>this.props.setModalShow(true)} variant="primary">Tambah Data</Button>
			</Col>
			</Row>

			<Row>
			{
				this.state.dataKaryawan.reverse().filter(valueFilter => valueFilter.nama_karyawan.toLowerCase().includes(this.state.valueSearch.toLowerCase())).map((value, index)=>{

					return(
						<Card style={{width: '200px', marginTop: '30px', marginLeft: '20px'}} key={index}>
						<Card.Body>
							<Card.Text>Nama : {value.nama_karyawan}</Card.Text>
							<Card.Text>Jabatan : {value.jabatan}</Card.Text>
							<Card.Text>Jenis Kelamin : {value.jenis_kelamin}</Card.Text>
							<Card.Text>Tanggal Lahir :{value.tanggal_lahir}</Card.Text>
						</Card.Body>

						<Card.Footer>
						<Button onClick={()=>this.hapusData(value.id)} style={{marginRight: '5%'}} variant="danger">Hapus</Button>
						<Button onClick={()=>this.panggilById(value.id)} variant="primary">Edit</Button>
						</Card.Footer>

					</Card>
						)
				})
			}
			</Row>
			</Container>
			)
	}

} 

export default Body;