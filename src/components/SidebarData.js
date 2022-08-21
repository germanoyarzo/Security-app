import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Listado de Objetivos',
    path: '/show-objetivos',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Cargar Jornada Vigilador',
    path: '/create',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Cambiar Foto de Perfil',
    path: '/upload-imagen',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  }
  
];