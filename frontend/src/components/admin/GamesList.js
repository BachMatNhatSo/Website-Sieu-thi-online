import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminGames, deleteGame, clearErrors } from '../../actions/gameActions'
import { DELETE_GAME_RESET } from '../../constants/gameConstants'

const GamesList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, games } = useSelector(state => state.games);
    const { error: deleteError, isDeleted } = useSelector(state => state.game)

    useEffect(() => {
        dispatch(getAdminGames());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Game deleted successfully');
            history.push('/admin/games');
            dispatch({ type: DELETE_GAME_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setGames = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Tên game',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Mô tả',
                    field: 'description',
                    sort: 'asc'
                },
                {
                    label: 'Số lượng tải xuống',
                    field: 'downloads',
                    sort: 'asc'
                },
                {
                    label: 'Hành động',
                    field: 'actions',
                },
            ],
            rows: []
        }

        games.forEach(game => {
            data.rows.push({
                id: game._id,
                name: game.name,
                description: game.description,
                downloads: game.downloads,
                actions: <Fragment>
                    <Link to={`/admin/game/${game._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" data-toggle="modal" data-target="#exampleModal" >
                        <i className="fa fa-trash"></i>
                    </button>
                    {/* model delete */}
                    <div>
                        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Thông báo!</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        Bạn có muốn xóa không
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteGameHandler(game._id)} data-dismiss="modal">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            })
        })

        return data;
    }

    const deleteGameHandler = (id) => {
        dispatch(deleteGame(id))
    }

    return (
        <Fragment>
            <MetaData title={'Tất cả game'} />

            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Tất cả game</h1>
                        <Link to='/admin/game'><button type="button" className="btn btn-primary">Thêm game mới</button></Link>

                        {games.length > 0 && (
                            loading ? <Loader /> : (
                                <MDBDataTable
                                    data={setGames()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                />
                            )
                        )}


                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default GamesList
