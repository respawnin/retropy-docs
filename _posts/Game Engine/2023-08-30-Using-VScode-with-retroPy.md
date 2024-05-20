---
layout: post
title: "Using VSCode with retroPy"
date: 2023-08-30 22:59:38 +0800
category: game-engine
author: retrocat
short-description: Setting up VSCode for use with retroPy's RP2040 hardware
---


# Using VScode with retroPy's console

  

**retroPy is a retro game engine for the RP2040 chip. Here, we show you how to connect to it using Visual Studio Code and the MicroPico extension.**

  
Assuming you already have [VSCode](https://code.visualstudio.com/download) installed and launched, head to the extensions tab and install MicroPico.
![VSCode MicroPico extension](https://raw.githubusercontent.com/respawnin/retropy-docs/main/assets/basics/VSCode_Install_MicroPico.png)

Plug in the retroPy hardware and connect to it by executing the command  `>MicroPico>Connect` in the search bar.

![VSCode MicroPico retroPy connect](https://raw.githubusercontent.com/respawnin/retropy-docs/main/assets/basics/VSCode_pico_connect.png)

You should see "Pico Connected" upon successful detection in the status bar at the bottom.
![VSCode retroPy connected](https://raw.githubusercontent.com/respawnin/retropy-docs/main/assets/basics/VSCode_retroPy_Connected.png)

In order to view the files in the retroPy, we'll need to create a folder to "download" the contents from the RP2040 in its entirety.
A tip to do this is to go to File> Open Folder and using the prompt, create a new folder to work out of. 
![VSCode retroPy create folder](https://raw.githubusercontent.com/respawnin/retropy-docs/main/assets/basics/VSCode_Folder.png)

Once you have created a retroPy folder to as a working folder, of sorts, proceed to download into from the RP2040 using the command `>MicroPico>Download project from Pico`
![VSCode - Download contents of retroPy into working folder](https://raw.githubusercontent.com/respawnin/retropy-docs/main/assets/basics/VSCode_pico_download.png)

It'll take a short while, but you should now see files inside your folder under your Explorer tab that looks something like this.
![VSCode - retroPy file explorer](https://raw.githubusercontent.com/respawnin/retropy-docs/main/assets/basics/VSCode_retroPy_Code.png)

You're all set to explore the codes within! 
**To test run your own code, click on Run at the bottom.**
![VSCode MicroPico Run](https://raw.githubusercontent.com/respawnin/retropy-docs/main/assets/basics/VSCode_pico_run.png)

When you're ready to save the code into the Pico, right click on your current working file in the Explorer tab, and select "Upload current file to Pico"
![VSCode Upload file to retroPy](https://raw.githubusercontent.com/respawnin/retropy-docs/main/assets/basics/VSCode_Upload_to_pico.png)




