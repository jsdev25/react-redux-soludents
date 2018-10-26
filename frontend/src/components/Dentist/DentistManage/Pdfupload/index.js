import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addDocument } from '../../../../actions/authentication';

const endpoint = 'http://localhost:5000/api/documents/upload'
const useradmin=JSON.parse(localStorage.getItem("UserAdmin"));

class ManageFile extends Component {
  constructor() {
    super()
    this.state = {
      selectedFile: null,
      loaded: 0,
    }
  }
  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }
  handleUpload = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)

    axios
      .post(endpoint, data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          })
        },
      })
      .then(res => {
        const document = {
          Filename: "",
          directory: "",
          dentist_id: useradmin._id,
          operator_id: ""
      }
          this.props.addDocument(document, this.props.history);
      })
  }
  render() {
    return (
      <div className="App">
        <input type="file" name="" id="" onChange={this.handleselectedFile} />
        <button onClick={this.handleUpload}>Upload</button>
        <div> {Math.round(this.state.loaded, 2)} %</div>
      </div>
    )
  }
}

ManageFile.propTypes = {
  addDocument: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ addDocument })(withRouter(ManageFile))