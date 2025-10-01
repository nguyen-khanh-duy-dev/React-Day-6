# Day 40

-   Bài 1: Thực hiện Redux core tự đầu
    1. Tự thiết lập Redux và sử dụng nó cho Counter App
    -   createStore:
        Nhận vào reducer và giá trị khởi tạo
        -   Trả ra:
            -   getState() -> Giá trị của state hiện tại
            -   dispatch(action): Bắn đi một action(object có type, payload). Gán lại giá trị của state từ reducer(state, action), chạy các hàm listener
            -   subscribe(listener): Nhận listener để xác định xem thay đổi gì
    -   reducer(state, action)
