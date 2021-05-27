const profileController = require("../../controllers/vendor/profileController");
const Van = require('../../model/van');

describe('openController', function() {
    const res = {
        redirect: jest.fn()
}

    // request object does not require any properties to test
    // getAllAuthors
    const req = {
        session:{vanId: '60ab52f48210f61385c3d5a7'},
        logout: jest.fn()
    };

    beforeAll(() => {
        // clear the render method (also read about mockReset)
        res.redirect.mockClear();
        
        // mock the Mongoose find() method return a
        // dummy list of authors
        Van.updateOne = jest.fn().mockResolvedValue([
            {
                _id: '60ab52f48210f61385c3d5a7',
                vanName: "Alvy",
                open: "true"
            }
        ]);
        // We are using the lean() method, so need to 
        // mock that as well. I'm mocking the function
        // to return Plain Old JavaScript Object (POJO)
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
        // It's needed when you're using console somewhere in the tests so you have clean mock each time
        console.log.mockClear();
    });


      test("console log", ()=>{
        expect(console.log).toBeCalledTimes(1);
        expect(console.log).toHaveBeenLastCalledWith('van 60ab52f48210f61385c3d5a7 logout')
      });

      test("Test case: testing with existing van id \
      60ab52f48210f61385c3d5a7, update van status to close, expecting redirect to homepage\
      with console", () => {
        // when I run the controller, I expect that the render method will
        // be called exactly once        
        expect(res.redirect.mock.calls.length).toEqual(1);
        // and because I'm looking up a food that I expect to be in my
        // database, the controller should render the page and not
        // return an error message!
        // expect(console.log).toHaveBeenCalledWith('the van is open');
        expect(res.redirect).toHaveBeenCalledWith('/vendor/');
        });
    })