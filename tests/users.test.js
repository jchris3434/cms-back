const { createUser } = require('./yourServiceFile'); // Adjust the path to where your functions are
const { responseHandler } = require('../middleware/response-handler');
const User = require('../models/User')();

describe('createUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user and return successfully', async () => {
    const mockReq = {
      body: { username: 'testUser', password: 'password' },
    };
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    User.create = jest.fn().mockResolvedValue(mockReq.body);

    await createUser(mockReq, mockRes);

    expect(User.create).toHaveBeenCalledWith(mockReq.body);
    expect(responseHandler).toHaveBeenCalledWith(mockReq.body, "User successfully created", expect.anything());
    expect(mockRes.status).not.toHaveBeenCalledWith(500);
  });

  it('should handle creation error', async () => {
    const error = new Error('Failed to create user');
    const mockReq = {
      body: { username: 'testUser', password: 'password' },
    };
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    User.create = jest.fn().mockRejectedValue(error);

    await createUser(mockReq, mockRes);

    expect(User.create).toHaveBeenCalledWith(mockReq.body);
    expect(responseHandler).toHaveBeenCalledWith(error, expect.anything(), expect.anything());
    expect(mockRes.status).toHaveBeenCalledWith(400); 
});
});
