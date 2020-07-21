import { addWatchIsLaterAPI } from "api/user";
import { showModel } from "components/redux/actions";
import { checkLogin } from "./auth";


export const addWatchIsLater = async (id, dispatch) => {
  const a = await checkLogin(dispatch);

  if (!a) {
    return dispatch(showModel());
  }

  let watch = JSON.parse(localStorage.getItem('watch-is-later'));
  const check = watch.some((some) => some === id);

  if (!check) {
    watch.push(id);
    localStorage.setItem('watch-is-later', JSON.stringify(watch));

    const token = localStorage.getItem('auth-token');

    await addWatchIsLaterAPI(token, watch);

    return {
      alert:
        'Thêm phim vào danh sách xem sau thành công. Reload loại trang để xem kết quả',
      variant: 'success',
    };
  }

  return {
    alert: 'Phim đã có trong danh sách.',
    variant: 'danger',
  };
};
