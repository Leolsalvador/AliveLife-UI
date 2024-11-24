import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { createUser } from "../axios";

export default function UserRegistrationModal({ open, handleClose }) {
  const [role, setRole] = useState("Paciente");
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    cpf: "",
    birthDate: "",
    crm: "",
    ufCrm: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    try {
      const response = createUser({ ...formData, role });
      console.log("Usuário criado com sucesso:", response);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Cadastro de Usuário
        </Typography>

        <RadioGroup
          row
          value={role}
          onChange={(e) => setRole(e.target.value)}
          sx={{ marginBottom: 2 }}
        >
          <FormControlLabel
            value="Paciente"
            control={<Radio />}
            label="Paciente"
          />
          <FormControlLabel
            value="Profissional"
            control={<Radio />}
            label="Profissional"
          />
        </RadioGroup>

        <TextField
          fullWidth
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Sobrenome"
          name="surname"
          value={formData.surname}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="E-mail"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="CPF"
          name="cpf"
          value={formData.cpf}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Data de nascimento"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
          placeholder="dd/mm/aaaa"
        />

        {role === "Profissional" && (
          <>
            <TextField
              fullWidth
              label="CRM"
              name="crm"
              value={formData.crm}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
            <Select
              fullWidth
              name="ufCrm"
              value={formData.ufCrm}
              onChange={(e) =>
                setFormData({ ...formData, ufCrm: e.target.value })
              }
              displayEmpty
              variant="outlined"
              margin="normal"
            >
              <MenuItem value="" disabled>
                Selecione
              </MenuItem>
              <MenuItem value="AC">AC</MenuItem>
              <MenuItem value="AL">AL</MenuItem>
              <MenuItem value="AP">AP</MenuItem>
              <MenuItem value="AM">AM</MenuItem>
              <MenuItem value="BA">BA</MenuItem>
              <MenuItem value="CE">CE</MenuItem>
              <MenuItem value="DF">DF</MenuItem>
              <MenuItem value="ES">ES</MenuItem>
              <MenuItem value="GO">GO</MenuItem>
              <MenuItem value="MA">MA</MenuItem>
              <MenuItem value="MT">MT</MenuItem>
              <MenuItem value="MS">MS</MenuItem>
              <MenuItem value="MG">MG</MenuItem>
              <MenuItem value="PA">PA</MenuItem>
              <MenuItem value="PB">PB</MenuItem>
              <MenuItem value="PR">PR</MenuItem>
              <MenuItem value="PE">PE</MenuItem>
              <MenuItem value="PI">PI</MenuItem>
              <MenuItem value="RJ">RJ</MenuItem>
              <MenuItem value="RN">RN</MenuItem>
              <MenuItem value="RS">RS</MenuItem>
              <MenuItem value="RO">RO</MenuItem>
              <MenuItem value="RR">RR</MenuItem>
              <MenuItem value="SC">SC</MenuItem>
              <MenuItem value="SP">SP</MenuItem>
              <MenuItem value="SE">SE</MenuItem>
              <MenuItem value="TO">TO</MenuItem>
            </Select>
          </>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleClose}
            sx={{ backgroundColor: "#00382C" }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            sx={{ backgroundColor: "#006B57" }}
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
