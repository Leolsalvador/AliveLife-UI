import React, { useEffect, useState } from "react";
import MenuTab from "../components/Menu";
import { Grid, Paper, Typography, Box, Button, TextField, Select, MenuItem, IconButton, Menu } from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import { getUsers, getUserUpdate, inativeUser } from "../axios";
import UserRegistrationModal from "../components/UserRegistrationModal";
import { buttonStyles } from "../utils";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Users() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("Todos");
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [dataEdit, setDataEdit] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const menuOpen = Boolean(anchorEl);

    const handleOpenModal = (user = null) => {
        setEditingUser(user);
        handleGetUserUpdate(user?.id);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setEditingUser(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getUsers();
            console.log("API Response:", response);
            if (response && response.data.users) {
                setUsers(response.data.users);
            } else {
                console.error("A resposta da API não contém 'users'");
                setUsers([]);
            }
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleMenuOpen = (event, user) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };

    const handleInactivateUser = async (user) => {
        try {
            await inativeUser(user.id);
            window.location.reload();
        } catch (error) {
            console.error("Erro ao inativar usuário:", error);
        }
    };

    const handleGetUserUpdate = async (id) => {
        try {
            const response = await getUserUpdate(id);
            if (response && response.data) {
                setDataEdit(response.data);
                setIsModalOpen(true);
            } else {
                console.error("A resposta da API não contém 'user'");
            }
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
        }
    };

    const filteredUsers = Array.isArray(users)
        ? users.filter((user) => {
              const matchesFilter = filter === "Todos" || user.role === filter;
              const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
              return matchesFilter && matchesSearch;
          })
        : [];

    if (loading) {
        return <LoadingScreen message="Carregando Usuários..." />;
    }

    return (
        <React.Fragment>
            <UserRegistrationModal
                open={isModalOpen}
                handleClose={handleCloseModal}
                user={editingUser} 
                data={dataEdit}
            />
            <MenuTab />
            <Paper sx={{ margin: "20px", padding: "20px" }}>
                <Typography variant="h4" sx={{ marginBottom: "20px", textAlign: "center" }}>
                    Usuários
                </Typography>

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Buscar usuários"
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Select
                            fullWidth
                            value={filter}
                            onChange={handleFilterChange}
                            variant="outlined"
                        >
                            <MenuItem value="Todos">Todos</MenuItem>
                            <MenuItem value="Paciente">Paciente</MenuItem>
                            <MenuItem value="Médico">Médico</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                        <Button variant="contained" sx={buttonStyles} onClick={handleOpenModal}>
                            Cadastrar Usuário
                        </Button>
                    </Grid>
                </Grid>

                <Box sx={{ marginTop: "20px" }}>
                    <Paper>
                        <Grid container sx={{ backgroundColor: "#00382C", color: "#fff", padding: "10px" }}>
                            <Grid item xs={4}>
                                Nome
                            </Grid>
                            <Grid item xs={3}>
                                CPF
                            </Grid>
                            <Grid item xs={3}>
                                Tipo de Usuário
                            </Grid>
                            <Grid item xs={2}>
                                Status
                            </Grid>
                        </Grid>

                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <Grid
                                    container
                                    key={index}
                                    sx={{
                                        padding: "10px",
                                        borderBottom: "1px solid #ccc",
                                        alignItems: "center",
                                    }}
                                >
                                    <Grid item xs={4}>{user.name}</Grid>
                                    <Grid item xs={3}>{user.additional_info.cpf || "Não informado"}</Grid>
                                    <Grid item xs={3}>{user.role || "Sem papel definido"}</Grid>
                                    <Grid item xs={2} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Typography
                                            sx={{
                                                color: user.status ? "green" : "red",
                                            }}
                                        >
                                            {user.status ? "Ativo" : "Inativo"}
                                        </Typography>
                                        <IconButton onClick={(event) => handleMenuOpen(event, user)}>
                                            <MoreVertIcon />
                                        </IconButton>
                                    </Grid>

                                    <Menu
                                        anchorEl={anchorEl}
                                        open={menuOpen}
                                        onClose={handleMenuClose}
                                        PaperProps={{
                                            style: {
                                                maxHeight: 200,
                                                width: "150px",
                                            },
                                        }}
                                    >
                                        <MenuItem onClick={() => { handleMenuClose(); handleOpenModal(selectedUser); }}>
                                            Editar
                                        </MenuItem>
                                        <MenuItem onClick={() => { handleMenuClose(); handleInactivateUser(selectedUser); }}>
                                            {selectedUser?.status ? "Inativar" : "Ativar"}
                                        </MenuItem>
                                    </Menu>
                                </Grid>
                            ))
                        ) : (
                            <Typography sx={{ textAlign: "center", padding: "20px" }}>
                                Nenhum usuário encontrado.
                            </Typography>
                        )}
                    </Paper>
                </Box>
            </Paper>
            <Typography align="center" sx={{ marginTop: "20px", color: "#BDBDBD" }}>
                Copyright © Alive&Life 2024.
            </Typography>
        </React.Fragment>
    );
}
