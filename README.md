# CSCI3800_Sp15_Team8
CSCI3800 Spring 2015 Team 8 Project

Scenario 1- Deny payment transaction based upon IP address lookup
 * Create a proxy with a payment API such as PWS. Need to require IP address of the payment accepting client to be included in the transaction.
 * Create an inline policy that takes IP address, performs a location lookup and based upon approved location allows the transaction to be processed.
 * If denied decline the transaction with a meaningful error message.
 * Also store the location where the transaction originated from for future use.
