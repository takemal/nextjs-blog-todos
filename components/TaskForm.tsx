import { useSelector } from 'react-redux';
// import { initialTaskAction, selectTask, updateTaskAction } from '../slices/taskslice';
import { KeyedMutator } from 'swr';
import { TaskType } from '../types/task';
import Cookies from 'universal-cookie';
import { RootState } from '../slices/store';
import { useContext } from 'react';
import { StateContext } from '../context/StateContext';

type Props = {
  mutate: KeyedMutator<TaskType[]>;
};

const cookies = new Cookies();

export default function TaskForm(props: Props) {
  const { mutate } = props;
  const { selectedTask, setSelectedTask } = useContext(StateContext);

  const create = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/`, {
      method: 'POST',
      body: JSON.stringify({ title: selectedTask.title }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${cookies.get('accessToken')}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid');
      }
    });
    setSelectedTask({ id: '0', title: '' });
    mutate();
  };

  const update = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${selectedTask.id}/`, {
      method: 'PUT',
      body: JSON.stringify({ title: selectedTask.title }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${cookies.get('accessToken')}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid');
      }
    });
    setSelectedTask({ id: '0', title: '' });
    mutate();
  };

  return (
    <div>
      {selectedTask.title}
      <form onSubmit={selectedTask.id !== '0' ? update : create}>
        <input
          className="text-black mb-8 px-2 py-1"
          type="text"
          value={selectedTask.title}
          onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
        />
        <button type="submit" className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase">
          {selectedTask.id !== '0' ? 'update' : 'create'}
        </button>
      </form>
    </div>
  );
}
