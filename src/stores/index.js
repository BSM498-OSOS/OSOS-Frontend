import { configureStore} from '@reduxjs/toolkit'
import authReducer from './auth.js'
import sidebarReducer from './sidebar.js'
import {meterService} from './meterService.js'
import {authService} from './authService.js'
import { setupListeners } from '@reduxjs/toolkit/dist/query/index.js'
import { readingService } from './readingService.js'
import { userAndOperationClaimService } from './userAndOperationClaimService.js'
import { customerService } from './customerService.js'
import { modemService } from './modemService.js'

const store= configureStore({
  reducer: {
    auth:authReducer,
    sidebar:sidebarReducer,
    meterService:meterService.reducer,
    authService:authService.reducer,
    readingService:readingService.reducer,
    userAndOperationClaimService: userAndOperationClaimService.reducer,
    customerService:customerService.reducer,
    modemService:modemService.reducer,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware()
  .concat(
    [meterService.middleware,
      authService.middleware,
      readingService.middleware,
      userAndOperationClaimService.middleware,
      customerService.middleware,
      modemService.middleware,
    ])
})
setupListeners(store.dispatch)
export default store