import React from 'react'
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Home, Settings, Task } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

const MenuListItems = ({list}) => {
    const history = useHistory();

    const navegar = (ruta) => {
        history.push(ruta);
    }

    const getIcon = () => {
        switch (icon) {
            case 'Home': return (<Home />);
            case 'Settings': return (<Settings />);
            case 'Task': return (<Task />);
            default: return (<Home />);
        }
    }


  return (
    <List>
        {list.map(({text, path, icon}, index) => {
            <ListItem key={index} button onClick={() => navigate(path)}>
                <ListItemIcon>
                    {getIcon(icon)}
                </ListItemIcon>
                <ListItemText>
                    primary={text}
                </ListItemText>
            </ListItem>
        })}
    </List>
  )
}

export default MenuListItems