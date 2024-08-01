import React from "react";
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import { Select } from "@mui/material";
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from "@mui/material/FormControl";

function ChipSelect(props){
    const {name, values} = props;

    const [selected, setSelected] = React.useState([]);
    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setSelected(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <div>
            <FormControl sx={{ width: "100%" }}>
                <InputLabel id="multiple-chip">{name}</InputLabel>
                <Select
                id={name}
                multiple
                name={name}
                input={<OutlinedInput id={`select-${name}`} label={name} />}
                label={name}
                value={selected}
                onChange={handleChange}
                sx={{ width: "100%"}}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} />
                    ))}
                    </Box>
                )}
                >
                    {values.map((value) => (
                    <MenuItem
                    key={value}
                    value={value}
                    >
                    {value}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default ChipSelect;

