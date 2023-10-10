import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { IKey, emptyKey } from '../../../../models/IKey';
import { assignKeyService, getAllKeys, getKeyByUSerID } from '../../../../services/keyService';
import { setMenuMessage } from '../../../../store/userSlice';
import { setKey } from '../../../../store/keysSlice';
import Button, { EButtonSize, EButtonType } from '../../../../components/Button/Button';
import './GetKeyButton.scss';

const GetKeyButton = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const toDoTasks = useSelector((state: RootState) => state.tasks.tasksToDo);
    const completedTasks = useSelector((state: RootState) => state.tasks.tasksCompleted);
    const [keyAssigned, setKeyAssigned] = useState<IKey>(emptyKey)

    const findAssignedKey = async () => {
        const foundAssignedKey = await getKeyByUSerID(user.id);
        return foundAssignedKey;
    }

    const findFreeKey = async () => {
      const allKeys = await getAllKeys();
      const freeKey = allKeys.find((key: IKey) => key.assignedTo.id === '');
      return freeKey;
    }

    const assignKey = async (keyId: string) => {
      await assignKeyService(keyId, user).then(() => {

      }).catch((e) => {
        dispatch(setMenuMessage('No pude asignarte una llave :('))
      })
    }

    useEffect(() => {
      const handleUserKey = async () => {
       await findAssignedKey().then(async (foundUserKey) => {
        if(foundUserKey.length === 0) {
          await findFreeKey().then(async (freeKey:IKey) => {
            if(freeKey) {
              await assignKey(freeKey.id).then((key) => {
                setKeyAssigned(freeKey);
                dispatch(setKey(freeKey));
              })
            }
          })
        } else {
          setKeyAssigned(foundUserKey);
          dispatch(setKey(foundUserKey));
        }
       })
      }
      handleUserKey();
    }, [])

    const goToKey = () => {
      console.log('Vamos a la llave');
    }

  return (
    <>
        {keyAssigned.id !== '' ?
         <div className='buttonContainer'>
            <Button key="button1" onClick={goToKey} text="Ir a la llave" buttonType={EButtonType.Main} buttonSize={EButtonSize.LargeButton} />
         </div> : 
         <div className='textContainer'>
          <p className='textContainer__text'>No quedan mas llaves, pero enhorabuena por terminar todas las tareas!</p>
         </div>}
    </>
  )
}

export default GetKeyButton