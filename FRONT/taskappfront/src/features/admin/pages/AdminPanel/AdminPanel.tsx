import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../../store/store';
import { deleteUser, getAllUsers } from '../../../../services/userService';
import { removeUser, setAllTasks, setAllUsers } from '../../../../store/adminSlice';
import { setMenuMessage } from '../../../../store/userSlice';
import {ReactComponent as ModificarIcon} from '../../../../assets/icons/Modificar.svg';
import {ReactComponent as EliminarIcon} from '../../../../assets/icons/Eliminar.svg';
import {ReactComponent as VerUsuario} from '../../../../assets/icons/EyeOpen.svg'
import AdminList from '../../components/AdminList/AdminList';
import Modal from '../../../../components/Modal/Modal';
import Button, { EButtonSize, EButtonType } from '../../../../components/Button/Button';
import { IUser, emptyUser } from '../../../../models/IUser';
import { useNavigate } from 'react-router-dom';
import AdminFloatingButton from '../../components/AdminFloatingMenu/AdminFloatingMenu';

const AdminPanel = () => {
    const stateAllUsers = useSelector((state: RootState) => state.admin.allUsers);
    const [users, setUsers] = useState(stateAllUsers);
    const [itemList, setItemList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [userSelected, setUserSelected] = useState<IUser>(emptyUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(stateAllUsers.length > 0) {
            setUsers(stateAllUsers);
            const newItemList = []
            stateAllUsers.forEach(user => {
                newItemList.push({
                    text: user.name,
                    icons: {
                      Ver: {icon: <VerUsuario />, action: () => navigate(`/user/${user.id}`)},
                      Modificar: { icon: <ModificarIcon />, action: () => navigate(`/edit-user/${user.id}`) },
                      Eliminar: { icon: <EliminarIcon />, action: () => openModal(user) }
                    },
                })
            })
            setItemList(newItemList);
        }
    }, [stateAllUsers]);

    const openModal = (user: IUser) => {
        setUserSelected(user);
        setShowModal(true);
    }

    const deleteUserAsync = async () => {
        await deleteUser(userSelected.id).then(data => {
            dispatch(setMenuMessage('Usuario borrado con éxito'));
            dispatch(removeUser(userSelected));
            setUserSelected(emptyUser);
        }).catch(() => {
            dispatch(setMenuMessage('Error borrando al usuario'));
            setUserSelected(emptyUser);
        }).finally(() => {
            setShowModal(false);
        })
    }

    
    const buttons = [
        <Button
          key="button1"
          onClick={deleteUserAsync}
          text="Aceptar"
          buttonType={EButtonType.Main}
          buttonSize={EButtonSize.LargeButton}
        />,
      ];

    useEffect(() => {
        const getAllUserData = async () => {
            await getAllUsers().then(data => {
                dispatch(setAllUsers(data));
            }).catch((e) => {
                console.log(e);
                dispatch(setMenuMessage('Error obteniendo usuarios.'))
            })
        }

        dispatch(setAllTasks([]))
        getAllUserData();
    }, [])

    const menuButtons = [
        {
            text: "Añadir tarea a todos",
            action: () => {navigate('/add-task-to-all')}
        },
        {
            text: "Ver Llaves",
            action: () => {}
        },
    ]

  return (
    <div>
        <AdminList items={itemList} />
        <AdminFloatingButton options={menuButtons} />
        {showModal &&        <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        buttons={buttons}
        title=""
      >
        <p style={{marginBottom: "24px"}}>¿Estás seguro de que quieres eliminar a este usuario?</p>

      </Modal>}
    </div>
  )
}

export default AdminPanel