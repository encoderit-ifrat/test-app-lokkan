import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  Snackbar,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import registerImage from '../public/Images/register.png'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import Image from 'next/image'
import BaseTextField from '../src/component/reuseable/baseTextField/BaseTextField'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import NoEncryptionOutlinedIcon from '@mui/icons-material/NoEncryptionOutlined'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import BaseOutlinedPhoneInput from '../src/component/reuseable/baseOutlinedPhoneInput/BaseOutlinedPhoneInput'
import { omitEmpties, registrationApi } from '../src/api'
import { useRouter } from 'next/router'
import en from 'locales/en'
import pt from 'locales/pt'
import { _baseURL } from 'consts'
import BaseButton from '@/component/reuseable/baseButton/BaseButton'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'

export default function Registration({ language, handleLoginOpen }) {
  const router = useRouter()
  const { query } = router
  const { data: session } = useSession()
  useEffect(() => {
    if (session) {
      router.push('/')
    }
  }, [session, router])
  const {
    user_type,
    brl_value,
    property_id,
    type,
    date,
    time,
    payment_type,
    cash_amount,
    model,
    year,
    brand,
    payment_per_installment,
    no_of_installment,
    observation,
    include_vehicle,
  } = query

  const [myValue, setMyValue] = useState(language || 'pt')
  const t = myValue === 'en' ? en : pt
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t['Name is required']),
    phone: Yup.string().required(t['Phone is required']),
    email: Yup.string()
      .required(t['Email is required'])
      .matches(/.+@.+\.[A-Za-z]+$/, t['Email is invalid']),
    password: Yup.string()
      .required(t['Password is required'])
      .min(8, t['Password must be at least 8 characters'])
      .max(40, t['Password must not exceed 40 characters']),
  })

  const {
    reset,
    watch,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const [successMessage, setSuccessMessage] = useState('')
  const [successSnackbarOpen, setSuccessSnackbarOpen] = React.useState(false)

  const handleClickSuccessSnackbar = () => {
    setSuccessSnackbarOpen(true)
  }

  const handleCloseSuccessSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSuccessSnackbarOpen(false)
  }

  const handleSocialLogin = (provider) => {
    const role_id = user_type === 'broker' ? 2 : user_type === 'owner' ? 3 : 4

    // Prepare your custom parameters
    const customParams = {
      role_id,
      type,
      property_id,
      date,
      time,
      payment_type,
      brl_value,
      cash_amount,
      payment_per_installment,
      no_of_installment,
      observation,
      model,
      year,
      brand,
      include_vehicle,
      images: localStorage.getItem('file_response'),
    }

    // Remove any undefined, null, or empty string values
    const filteredParams = Object.fromEntries(
      Object.entries(customParams).filter(
        ([, value]) => value !== undefined && value !== null && value !== '',
      ),
    )

    // Store filtered parameters in localStorage
    localStorage.setItem('customParams', JSON.stringify(filteredParams))

    // Redirect to the OAuth provider
    window.location.replace(`${_baseURL}/api/redirect/${provider}`)
  }

  const [activeBtn, setActiveBtn] = useState(4)

  const [showPass, setShowPass] = React.useState(false)
  const handleClickShowPassword = () => {
    setShowPass(!showPass)
  }
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [message, setMessage] = useState('')

  const handleClickSnackbar = () => {
    setSnackbarOpen(true)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }
  const [loading, setLoading] = useState(false)
  const allValues = watch()

  useEffect(() => {
    if (activeBtn === 2) {
      localStorage.setItem(
        'broker_registration',
        JSON.stringify({ ...allValues, role_id: activeBtn }),
      )
    }
  }, [activeBtn, allValues])

  const onSubmit = async (data) => {
    setLoading(true)

    const allData = omitEmpties({
      ...data,
      role_id: user_type === 'broker' ? 2 : user_type === 'owner' ? 3 : 4,
      type: type,
      date: date,
      time: time,
      cash_amount: cash_amount,
      brl_value: brl_value,
      payment_type: payment_type,
      payment_per_installment: payment_per_installment,
      no_of_installment: no_of_installment,
      observation: observation,
      property_id: property_id,
      redirect_url: `${window.location.origin}/user-loading`,
      images: JSON.parse(localStorage?.getItem('file_response')),
      model: model,
      year: year,
      brand: brand,
      include_vehicle: +include_vehicle,
    })

    const [errorToken, responseToken] = await registrationApi(allData)
    setLoading(false)
    if (!errorToken) {
      if (responseToken?.data?.userRole === 'buyer') {
        localStorage.clear()
        toast.success(responseToken?.data?.message, {
          duration: 15000, // Duration in milliseconds (5000 ms = 5 seconds)
        })
      } else {
        localStorage.setItem('registration_id', responseToken?.data?.user?.id)
        localStorage.setItem('user_role', responseToken?.data?.userRole)
        localStorage.setItem('Reg_user_name', data?.name)
        router.replace({
          pathname: '/other-information',
        })
      }
    } else {
      const errors = errorToken?.response?.data?.errors ?? {}
      Object.entries(errors).forEach(([name, messages]) => {
        setError(name, { type: 'manual', message: messages[0] })
      })
      setLoading(false)
      toast.error(errorToken?.response?.data?.message, {
        duration: 15000, // Duration in milliseconds (5000 ms = 5 seconds)
      })
    }
  }

  return (
    <div>
      <Head>
        <title>Lokkan - A imobiliária digital</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />
      </Head>

      <main className="section">
        <Box sx={{ px: 5 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{ py: 4 }}
              >
                <Button
                  sx={{ textTransform: 'none' }}
                  onClick={() => router.back()}
                >
                  <ArrowBackIosNewOutlinedIcon sx={{ color: '#7450F0' }} />
                  <Typography
                    variant="p"
                    sx={{
                      color: '#7450F0',
                      fontSize: '14px',
                      fontWeight: '600',
                      lineHeight: '17px',
                    }}
                  >
                    {t['Cancel registration']}
                  </Typography>
                </Button>
                <Container maxWidth="xs">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      sx={{ mt: 8, mb: 1 }}
                    >
                      <Typography
                        variant="p"
                        sx={{
                          color: '#253858',
                          fontSize: '14px',
                          fontWeight: '400',
                          lineHeight: '16px',
                        }}
                      >
                        {t['Name']}
                        <span style={{ color: '#E63333' }}>*</span>
                      </Typography>
                    </Grid>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <BaseTextField
                          size={'small'}
                          placeholder={t['Name']}
                          onChange={(e) => {
                            field.onChange(e.target.value)
                          }}
                          name={'name'}
                        />
                      )}
                    />
                    <Typography
                      variant="inherit"
                      color="textSecondary"
                      sx={{ color: '#b91c1c' }}
                    >
                      {errors.name?.message}
                    </Typography>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      sx={{ mt: 3, mb: 1 }}
                    >
                      <Typography
                        variant="p"
                        sx={{
                          color: '#253858',
                          fontSize: '14px',
                          fontWeight: '400',
                          lineHeight: '16px',
                        }}
                      >
                        {t['Email']}
                        <span style={{ color: '#E63333' }}>*</span>
                      </Typography>
                    </Grid>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <BaseTextField
                          size={'small'}
                          placeholder={t['Email']}
                          onChange={(e) => {
                            field.onChange(e.target.value)
                          }}
                          name={'email'}
                        />
                      )}
                    />
                    <Typography
                      variant="inherit"
                      color="textSecondary"
                      sx={{ color: '#b91c1c' }}
                    >
                      {errors.email?.message}
                    </Typography>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      sx={{ mt: 3, mb: 1 }}
                    >
                      <Typography
                        variant="p"
                        sx={{
                          color: '#253858',
                          fontSize: '14px',
                          fontWeight: '400',
                          lineHeight: '16px',
                        }}
                      >
                        {t['Phone']}
                        <span style={{ color: '#E63333' }}>*</span>
                      </Typography>
                    </Grid>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <BaseOutlinedPhoneInput
                          size={'small'}
                          placeholder={t['Phone']}
                          onChange={(e) => {
                            field.onChange(e.target.value)
                          }}
                          name={'phone'}
                          value={field.value}
                          error={errors.phone ? true : false}
                        />
                      )}
                    />
                    <Typography
                      variant="inherit"
                      color="textSecondary"
                      sx={{ color: '#b91c1c' }}
                    >
                      {errors.phone?.message}
                    </Typography>

                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      sx={{ mt: 3, mb: 1 }}
                    >
                      <Typography
                        variant="p"
                        sx={{
                          color: '#253858',
                          fontSize: '14px',
                          fontWeight: '400',
                          lineHeight: '16px',
                        }}
                      >
                        {t['Password']}
                        <span style={{ color: '#E63333' }}>*</span>
                      </Typography>
                    </Grid>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <BaseTextField
                          size={'small'}
                          placeholder={t['Password']}
                          type={showPass ? 'text' : 'password'}
                          name={'password'}
                          // {...field}
                          onChange={(e) => {
                            field.onChange(e.target.value)
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment
                                sx={{ cursor: 'pointer' }}
                                position="end"
                                onClick={handleClickShowPassword}
                              >
                                {showPass ? (
                                  <NoEncryptionOutlinedIcon />
                                ) : (
                                  <LockOutlinedIcon />
                                )}
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                    <Typography
                      variant="inherit"
                      color="textSecondary"
                      sx={{ color: '#b91c1c' }}
                    >
                      {errors.password?.message}
                    </Typography>

                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      spacing={1}
                      mt={5}
                    >
                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <BaseButton
                          sx="error"
                          color="error"
                          variant="outlined"
                          fullWidth
                          handleFunction={() => {
                            reset()
                            router.replace('/')
                          }}
                        >
                          {t['Cancel']}
                        </BaseButton>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                        <BaseButton
                          type="submit"
                          fullWidth
                          custom_sx={{
                            background:
                              'linear-gradient(270deg, #1DEECB 1.2%, #00C1B4 98.7%)',
                            boxShadow: '0px 4px 34px rgba(0, 0, 0, 0.08)',
                            borderRadius: '4px',
                            color: '#ffffff',
                            fontSize: '16px',
                            lineHeight: '22px',
                            fontWeight: '600',
                            textTransform: 'none',
                            py: 1,
                          }}
                        >
                          {loading && (
                            <CircularProgress size={22} color="inherit" />
                          )}
                          {!loading && t['Register']}
                        </BaseButton>
                      </Grid>
                    </Grid>
                  </form>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: '8vh' }}
                  >
                    ou
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                      <Button
                        sx={{
                          display: 'flex',
                          background: '#DC4C3F',
                          borderRadius: '4px',
                          textTransform: 'none',
                          px: 2,
                          py: 1,
                          width: '100%',
                          '&:hover': {
                            background: '#DC4C3F',
                            borderRadius: '4px',
                            textTransform: 'none',
                            px: 2,
                            py: 1,
                            width: '100%',
                          },
                        }}
                        onClick={() => handleSocialLogin('google')}
                      >
                        <GoogleIcon sx={{ color: '#ffffff' }} />
                        <Typography
                          sx={{
                            color: '#ffffff',
                            fontSize: {
                              xs: '12px',
                              sm: '12px',
                              md: '12px',
                              lg: '12px',
                              xl: '12px',
                              xxl: '14px',
                            },
                            lineHeight: '17px',
                            fontWeight: '400',
                          }}
                        >
                          Login with Gmail
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                      <Button
                        sx={{
                          display: 'flex',
                          background: '#4469B0',
                          borderRadius: '4px',
                          textTransform: 'none',
                          px: 2,
                          py: 1,
                          width: '100%',
                          '&:hover': {
                            background: '#4469B0',
                            borderRadius: '4px',
                            textTransform: 'none',
                            px: 2,
                            py: 1,
                            width: '100%',
                          },
                        }}
                        onClick={() => handleSocialLogin('facebook')}
                      >
                        <FacebookOutlinedIcon sx={{ color: '#ffffff' }} />
                        <Typography
                          sx={{
                            color: '#ffffff',
                            fontSize: {
                              xs: '12px',
                              sm: '12px',
                              md: '12px',
                              lg: '12px',
                              xl: '12px',
                              xxl: '14px',
                            },
                            lineHeight: '17px',
                            fontWeight: '400',
                          }}
                        >
                          Login with Facebook
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        sx={{
                          background:
                            'linear-gradient(270deg, #0ea5e9 1.2%, #083344 98.7%)',
                          boxShadow: '0px 4px 34px rgba(0, 0, 0, 0.08)',
                          borderRadius: '4px',
                          color: '#ffffff',
                          fontSize: '16px',
                          lineHeight: '22px',
                          fontWeight: '600',
                          mt: 5,
                          textTransform: 'none',
                          py: 1,
                        }}
                        onClick={() => {
                          router.replace({ pathname: '/' })
                          handleLoginOpen()
                        }}
                      >
                        Entrar
                      </Button>
                    </Grid>
                  </Grid>
                </Container>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              <Box>
                <Image src={registerImage} alt="register" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          key={'top'}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: '100%' }}
          >
            {message && message}
          </Alert>
        </Snackbar>

        <Snackbar
          open={successSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSuccessSnackbar}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          key={'bottom'}
        >
          <Alert
            onClose={handleCloseSuccessSnackbar}
            severity="success"
            sx={{ width: '100%' }}
          >
            {successMessage && successMessage}
          </Alert>
        </Snackbar>
      </main>
    </div>
  )
}
