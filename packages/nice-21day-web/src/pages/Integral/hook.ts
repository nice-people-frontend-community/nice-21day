import { useState } from 'react';
import { message } from 'antd';
import { IUser, ITraining } from '@nice-21day/shared';
import {
  queryAllNickNameList,
  queryAllTrainingNameList
} from '../../services';

export const useGetNickNameList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [nickNameList, setNickNameList] = useState<IUser[]>([]);
  const getNickNameList = async (nick_name: string) => {
    try {
      setLoading(true);
      const res: IUser[] = await queryAllNickNameList(nick_name);
      if (res.length) setNickNameList(res ?? []);
    } catch (err) {
      message.error('请求错误', 2);
    } finally {
      setLoading(false);
    }
  };
  return {
    nickNameLoading: loading,
    nickNameList,
    getNickNameList,
  };
};

export const useGetTrainingkNameList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [trainingNameList, setTrainingNameList] = useState<ITraining[]>([]);
  const getTrainingNameList = async (name: string) => {
    try {
      setLoading(true);
      const res: ITraining[] = await queryAllTrainingNameList(name);
      if (res.length) setTrainingNameList(res ?? []);
    } catch (err) {
      message.error('请求错误', 2);
    } finally {
      setLoading(false);
    }
  };
  return {
    trainingNameLoading: loading,
    trainingNameList,
    getTrainingNameList,
  };
};
