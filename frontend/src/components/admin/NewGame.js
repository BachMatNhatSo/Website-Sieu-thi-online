import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newGame, clearErrors } from '../../actions/gameActions'
import { NEW_GAME_RESET } from '../../constants/gameConstants'

const NewGame = ({ history }) => {

    const [name, setName] = useState('');
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [required, setRequired] = useState('');
    const [imagesPreview, setImagesPreview] = useState([])

    const categories = [
        'Action Games',
        'Arcade Games',
        '3D Games',
        'Racing Games'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, success } = useSelector(state => state.newGame);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/games');
            alert.success('Thêm game thành công');
            dispatch({ type: NEW_GAME_RESET })
        }

    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('required', required);

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(newGame(formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);
        setImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }


    return (
        
        <Fragment>
  <MetaData title={'Thêm game mới'} />
  <div className="row">
    <div className="col-12 col-md-2">
      <Sidebar />
    </div>

    <div className="col-12 col-md-10">
      <Fragment>
        <div className="wrapper my-5">
          <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
            <h1 className="mb-4">Thêm game mới</h1>

            <div className="form-group">
              <label htmlFor="name_field">Tên game</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description_field">Mô tả</label>
              <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="category_field">Danh mục</label>
              <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map(category => (
                  <option key={category} value={category} >{category}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="required_field">Yêu cầu cấu hình tối thiểu</label>
              <input
                type="text"
                id="required_field"
                className="form-control"
                value={required}
                onChange={(e) => setRequired(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label>Hình game</label>

              <div className='custom-file'>
                <input
                  type='file'
                  name='game_images'
                  className='custom-file-input'
                  id='customFile'
                  onChange={onChange}
                  multiple
                />
                <label className='custom-file-label' htmlFor='customFile'>
                  Chọn hình
                </label>
              </div>

              {imagesPreview && imagesPreview.map(img => (
                <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
              ))}

            </div>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Thêm mới
            </button>

          </form>
        </div>
      </Fragment>
    </div>
  </div>
</Fragment>

    )
}

export default NewGame
