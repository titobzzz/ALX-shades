// import jwtRefreshInterceptor from '../src/utils/responseinterceptor';

// test('should add authorization header and handle response for POST request', async () => {
//     AsyncStorage.getItem = jest.fn().mockResolvedValue('"mockToken"');
//     jwtRefreshInterceptor.post = jest.fn().mockResolvedValue({ data: 'mockData' });

//     const response = await axiosPostInterceptor('/mock-url', { key: 'value' });




//     expect(jwtRefreshInterceptor.post).toHaveBeenCalledWith('/mock-url', { key: 'value' }, {
//         headers: {
//             Authorization: 'Bearer mockToken',
//             'Content-Type': 'multipart/form-data',
//         },
//     });
//     expect(response.data).toBe('mockData');
// });
