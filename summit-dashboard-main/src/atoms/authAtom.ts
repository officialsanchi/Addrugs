import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist({
    key: 'recoil-persist',
    storage: localStorage

})

export const UserAuthState = atom({
    key: 'auth',
    default: null,
    effects_UNSTABLE: [persistAtom]
})