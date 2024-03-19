import { CardEntity, CardModel } from '../../database';
import { BaseError } from '../../../definitions';
import { CardStatusEnum } from '../../enums';

export class TransactionRepository {
  static async makeTransaction(sender: CardEntity, receiver: CardEntity, amount: number) {
    if (sender.getMoney() < amount) {
      throw new BaseError('Transaction not created, your money is too low');
    }
    if (receiver.getStatus() == CardStatusEnum.EXPIRED) {
      throw new BaseError('Receiver card expired');
    }
    if (sender.getStatus() == CardStatusEnum.EXPIRED) {
      throw new BaseError('Sender card expired');
    }
    receiver.buildMoney(receiver.getMoney() + amount);
    sender.buildMoney(sender.getMoney() - amount);
    CardModel.findOneAndUpdate({ _id: receiver.getId() }, receiver.convertToSchema());
    CardModel.findOneAndUpdate({ _id: sender.getId() }, sender.convertToSchema());
    return { success: true, amount };
  }
}