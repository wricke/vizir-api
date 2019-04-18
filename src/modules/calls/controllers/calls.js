import Calls from '../models/calls';
import { Emitter } from '../../../services/emitter';

class CallsController {
  static async Get(req, res) {
    Object.keys(req.query).forEach(x => (req.query[x] ? null : delete req.query[x]));
    let response;
    try {
      const calls = await Calls.find(req.query);
      if (calls.length) {
        response = {
          status: 200,
          data: calls,
        };
      } else {
        response = {
          status: 404,
          data: calls,
          message: 'Nenhum registro encontrado :/',
        };
      }
    } catch (err) {
      response = {
        status: 500,
        message: err,
      };
    }
    return Emitter(res, response);
  }
}

export default CallsController;
