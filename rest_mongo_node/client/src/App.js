import React, {Component} from 'react';
import axios from 'axios';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup,
    Label
} from 'reactstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            newUserData: {
                name: "",
                subscribedToChannel: ""
            },
            editUserData: {
                id: "",
                name: "",
                subscribedToChannel: ""
            },
            newUserModal: false,
            editUserModal: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/subs').then(res => {
            this.setState({
                user: res.data
            })
        }).catch(error => {
            console.log(error.response)
        })
    }

    toggleNewUser = () => {
        this.setState({newUserModal: !this.state.newUserModal})
    }

    toggleEditUser = () => {
        this.setState({editUserModal: !this.state.editUserModal})
    }

    addUser() {
        axios.post('http://localhost:5000/subs', this.state.newUserData).then((res) => {
            console.log(res.data)
            let {user} = this.state;
            user.push(res.data)
            this.setState({
                user, newUserModal: false, newUserData: {
                    name: "",
                    subscribedToChannel: ""
                }
            })
        }).catch(error => {
            console.log(error.response)
        })
    }

    editUser(id, name, subscribedToChannel) {
        console.log(id, name, subscribedToChannel)
        this.setState({
            editUserData: {
                id, name, subscribedToChannel
            }, editUserModal: !this.state.editUserModal
        })
    }

    updateUser() {
        let {name, subscribedToChannel} = this.state.editUserData
        axios.patch('http://localhost:5000/subs/' + this.state.editUserData.id, {
            name, subscribedToChannel
        }).then(res => {
            this._refreshUser()
            this.setState({
                editUserModal: false,
                editUserData: {
                    id: "",
                    name: "",
                    subscribedToChannel: ""
                }
            })
            console.log(res.data)
        })
    }

    deleteUser(id) {
        console.log(id)
        axios.delete('http://localhost:5000/subs/' + id).then(res => {
            console.log(`user with id: ${id} deleted successfully!!`)
            this._refreshUser()
        }).catch(error => {
            console.log(error.response)
        })
    }

    _refreshUser() {
        axios.get('http://localhost:5000/subs').then(res => {
            this.setState({
                user: res.data
            })
        }).catch(error => {
            console.log(error.response)
        })
    }

    render() {
        let users = this.state.user.map((user) => {
            return (
                <tr key={user._id}>
                    <td>{user._id.slice(0, 7)}</td>
                    <td>{user.name}</td>
                    <td>{user.subscribedToChannel}</td>
                    <td>{user.subscribeDate}</td>
                    <td>
                        <button className="btn btn-sm btn-success mr-2"
                                onClick={this.editUser.bind(this, user._id, user.name, user.subscribedToChannel)}>Edit
                        </button>
                        <button className="btn btn-sm btn-danger ml-1"
                                onClick={this.deleteUser.bind(this, user._id)}>Delete
                        </button>
                    </td>
                </tr>
            )
        })

        return (
            <div className="container p-1 mt-3">
                <h1>Channel subscription </h1>
                <Button color="success" onClick={this.toggleNewUser.bind(this)}>Add Subscriber</Button>
                <Modal isOpen={this.state.newUserModal} toggle={this.toggleNewUser.bind(this)}>
                    <ModalHeader toggle={this.toggleNewUser.bind(this)}>Add a subscriber</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">User Name</Label>
                            <Input type="text" id="name" value={this.state.newUserData.name}
                                   placeholder="Enter name" onChange={(e) => {
                                let {newUserData} = this.state;
                                newUserData.name = e.target.value;
                                this.setState({
                                    newUserData
                                })
                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="channel">Channel Name</Label>
                            <Input type="text" id="channel" value={this.state.subscribedToChannel}
                                   placeholder="Enter channel name" onChange={(e) => {
                                let {newUserData} = this.state;
                                newUserData.subscribedToChannel = e.target.value;
                                this.setState({
                                    newUserData
                                })
                            }}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addUser.bind(this)}>Add User</Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewUser.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <br/>

                <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUser.bind(this)}>
                    <ModalHeader toggle={this.toggleEditUser.bind(this)}>Edit a subscriber</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">User Name</Label>
                            <Input type="text" id="name" value={this.state.editUserData.name}
                                   placeholder="Enter name" onChange={(e) => {
                                let {editUserData} = this.state;
                                editUserData.name = e.target.value;
                                this.setState({
                                    editUserData
                                })
                            }}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="channel">Channel Name</Label>
                            <Input type="text" id="channel" value={this.state.editUserData.subscribedToChannel}
                                   placeholder="Enter channel name" onChange={(e) => {
                                let {editUserData} = this.state;
                                editUserData.subscribedToChannel = e.target.value;
                                this.setState({
                                    editUserData
                                })
                            }}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateUser.bind(this)}>Update User</Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditUser.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <div className="card mt-3">
                    <div className="card-body">
                        <table className="table table-active">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Channel</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;