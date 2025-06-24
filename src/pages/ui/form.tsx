'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL' }),
});

type FormData = z.infer<typeof schema>;

interface InputFormProps {
  onSubmit: (input: { type: 'github' | 'website'; url: string }) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [type, setType] = useState<'github' | 'website'>('github');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitHandler = (data: FormData) => {
    onSubmit({ type, url: data.url });
    reset(); // Optional: clear form after submit
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Generate Technical Documentation
      </Typography>

    <Box display="flex" justifyContent="center" mb={3}>
      <ToggleButtonGroup
        value={type}
        exclusive
        onChange={(_, newType) => newType && setType(newType)}
      >
        <ToggleButton value="github">GitHub Repo</ToggleButton>
        <ToggleButton value="website">Website</ToggleButton>
      </ToggleButtonGroup>
    </Box>

      <form onSubmit={handleSubmit(submitHandler)} noValidate>
        <Box mb={3}>
          <TextField
            label={type === 'github' ? 'GitHub Repository URL' : 'Website URL'}
            fullWidth
            variant="outlined"
            placeholder={type === 'github' ? 'https://github.com/user/repo' : 'https://example.com'}
            {...register('url')}
            error={!!errors.url}
            helperText={errors.url?.message}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Generating...' : 'Generate Documentation'}
        </Button>
      </form>
    </Paper>
  );
};

export default InputForm;
