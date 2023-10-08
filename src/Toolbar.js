import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { MyClock } from './Clock'

export class ToolBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openUserMenu: false,
            anchorElNav: null,
            anchorElUser: null,
            logged: false,
        }
        this.handleOpenNavMenu = this.handleOpenNavMenu.bind(this)
        this.handleChangeUserMenu = this.handleChangeUserMenu.bind(this)
        this.handleCloseNavMenu = this.handleCloseNavMenu.bind(this)
        this.handleCloseUserMenu = this.handleCloseUserMenu.bind(this)
    }

    handleOpenNavMenu = (event) => {
        this.setState({
            anchorElNav: event.currentTarget,
        })
    }

    handleChangeUserMenu() {
        this.setState({
            openUserMenu: !this.state.openUserMenu,
        })
    }

    handleCloseNavMenu = () => {
        this.setState({
            anchorElNav: null,
        })
    }

    handleCloseUserMenu = () => {
        this.setState({
            openUserMenu: null,
        })
    }

    render() {
        return (
            <div>
                <AppBar
                    position="relative"
                    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, mb: 4 }}
                >
                    <MyClock
                        currentTime={this.props.currentTime}
                        isRunning={this.props.isRunning}
                        actionOnStopClick={this.props.actionOnStopClick}
                    ></MyClock>
                </AppBar>
            </div>
        )
    }
}
