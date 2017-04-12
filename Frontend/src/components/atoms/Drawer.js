import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';

const SideDrawer = (props) => {
    const {
        open,
        handleDrawer
    } = props;
    const drawerWidth = 240;
    const navItems = ['Home', 'About', 'Contact'];
    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Box onClick={handleDrawer} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Find Coders
            </Typography>
            <Divider />
            <Box>
                <List>
                    {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
            </Box>
          </Box>
        </Drawer>
    );
}

export default SideDrawer;