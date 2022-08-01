import React from 'react';
import './App.css';


type AppProps = {
};
type AppFile = {
  url: string;
  name: string;
  
}
type AppState = {
  filesList: Array<AppFile>;
  currentImgSrc: string;
};

function getFileNameFromUrl(link: any) {
  return decodeURI(link.split('/').pop());
}

class App extends React.Component<AppProps, AppState> {
  constructor() {
    super({})
    this.onChange = this.onChange.bind(this);
    this.state = {
      filesList: [],
      currentImgSrc: ''
    }
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if(!files) {
      console.log('No files');
      return;
    };

    const file = files[0];
    const url = URL.createObjectURL(file);
    this.setState({filesList: this.state.filesList.length === 5 ? [...this.state.filesList, {name: file.name ,url}].slice(1) : [...this.state.filesList, {name: file.name ,url}]})
  }
        
  render(): React.ReactNode {
     
    
    return (
      <div className="App">
        <div className='storage-area'>
          {this.state.filesList.map((item, index) => 
            <div key={index} className="img-item">
              <button onClick={() => this.setState({currentImgSrc: item.url})}>{getFileNameFromUrl(item.name)}</button>
            </div>
          )}
          <form encType="multipart/form-data" className='img-item loader-form'>
            
            <label htmlFor="actual-btn" className='loader'>+ Upload Your Image</label>
            <input type="file" id="actual-btn" accept="image/*,image/jpeg"  className='input' onChange={this.onChange}/>
          
          </form>
        </div>
        <div className='preview'>
          {this.state.currentImgSrc === '' ? null : <img src={this.state.currentImgSrc}/>}
        </div>
      </div>
      )}
}



export default App;