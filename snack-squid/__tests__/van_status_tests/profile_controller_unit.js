const profileController = require("../../controllers/vendor/profileController");
const Van = require('../../model/van');

describe('openController', function() {
    const res = {
        redirect: jest.fn()
}

    //  properties needed for request to test
    //  function close
    const req = {
        session:{vanId: '60ab52f48210f61385c3d5a7'},
        logout: jest.fn()
    };

    beforeAll(() => {
        // clear the render method (also read about mockReset)
        res.redirect.mockClear();
        
        // mock the Mongoose updateOne method
        Van.updateOne = jest.fn().mockResolvedValue([
            {
                _id: '60ab52f48210f61385c3d5a7',
                vanName: "Alvy",
                open: "true"
            }
        ]);
         // mock lean() method
        Van.updateOne.mockImplementationOnce(() => ({
            lean: jest.fn().mockReturnValue(
                {
                    _id: '60ab52f48210f61385c3d5a7',
                    vanName: "Alvy",
                    open: "true"
                }),
                
            }));

        // call the controller function before testing various properties of
        // it
        profileController.close(req, res);
        jest.spyOn(console, 'log').mockImplementation(() => {});
      });

    afterAll(() => {
        // Restore mock after all tests are done, so it won't affect other test suites
        console.log.mockRestore();
    });
    afterEach(() => {
        // Clear mock (all calls etc) after each test. 
        console.log.mockClear();
    });

    // Test 1: test the console
    test("Test 1: test console log, expecting van 60ab52f48210f61385c3d5a7 logout", ()=>{
        expect(console.log).toBeCalledTimes(1);
        expect(console.log).toHaveBeenLastCalledWith('van 60ab52f48210f61385c3d5a7 logout')
    });

    test("Test 2: testing with existing van id 60ab52f48210f61385c3d5a7, set van status to close,\
     expecting redirect to homepage ", () => {
        // when I run the controller, I expect that the redirect method will
        // be called exactly once        
        expect(res.redirect.mock.calls.length).toEqual(1);
        
        // expect to redirect to homepage route
        expect(res.redirect).toHaveBeenCalledWith('/vendor/');
        });
    })