import React from 'react'

export default class FilesUploadComponent extends React.Component {
    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            profileImg: ''
        }
    }

    onFileChange(e) {
        console.log(e.target.files[0])

        this.setState({ profileImg: e.target.files[0] })
    }

    onSubmit = async (e)=>{
        console.log(this.state.profileImg)
        let blob = await new Promise(resolve => this.state.profileImg.toBlob(resolve, 'image/png'));
        console.log("ss")
      let response = await fetch('http://localhost:8080/image', {
        method: 'POST',
        body: blob
      });

        console.log(response)
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}