import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class DynamodbService {
  AWS;
  docClient;
  TABLE;

  constructor() {
    this.AWS = AWS;
    this.AWS.config.update({region: 'us-east-1'});
    this.AWS.config.credentials = new this.AWS.SharedIniFileCredentials({profile: 'default'});
    this.docClient = new this.AWS.DynamoDB.DocumentClient();
    // this.TABLE = table;
  }

  scan(table) {
    const params = {
      TableName: table
    };
    return new Promise((resolve, reject) => {
      this.docClient.scan(params, function(err, data) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(data.Items);
        }
      });
    });
  }

  query(table: string, projection: string, conditionExpression: string, attributeNames: any, attributeValues: any) {
    const params = {
      TableName: table,
      ProjectionExpression: projection,
      KeyConditionExpression: conditionExpression,
      ExpressionAttributeNames: attributeNames,
      ExpressionAttributeValues: attributeValues
    };
    return new Promise((resolve, reject) => {
      this.docClient.query(params, function(err, data) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(data.Items);
        }
      });
    });
  }

  get(table, keys: any) {
    const params = {
      TableName: table,
      Key: keys
    };
    console.log(params);
    return new Promise((resolve, reject) => {
      this.docClient.get(params, function(err, data) {
        if (err) {
          reject(err);
        } else {
          console.log(data);
          resolve(data);
        }
      });
    });
  }
}
