{
  "WELLKNOWNISSUE": {
    "CASES": [
      {
        "-version": "Independent",
        "-platform": "Independent",
        "FAILEDPROCESS": [
          {
            "-name": "OHASD",
            "ERROR": [
              {
                "-id": "1",
                "CONTENT": [
                  {
                    "-log": "ohasd",
                    "-Clause": "and",
                    "#text": "utopen:7:failed to open any OCR file/disk, errno=2, os err string=No such file or directory"
                  },
                  {
                    "-log": "ohasd",
                    "-Clause": "and",
                    "#text": "Error: PROCL-26: Error while accessing the physical storage Operating System error"
                  },
                  {
                    "-log": "ohasd",
                    "-Clause": "and",
                    "#text": "OHASD exiting; Could not init OLR"
                  }
                ],
                "RECOMMENDATION": "Restore a good backup of OLR with \"ocrconfig -local -restore ocr_backup_name\".By default, OLR will be backed up to $GRID_HOME/cdata/$HOST/backup_$TIME_STAMP.olr once installation is complete."
              },
              {
                "-id": "2",
                "CONTENT": [
                  {
                    "-log": "ohasd",
                    "-Clause": "and",
                    "#text": "clsclisten: Permission denied for (ADDRESS=(PROTOCOL=ipc)(KEY=procr_local_conn_0_PROL)) "
                  },
                  {
                    "-log": "ohasd",
                    "-Clause": "and",
                    "#text": "th_listen: CLSCLISTEN failed clsc_ret= 3, addr= [(ADDRESS=(PROTOCOL=ipc)(KEY=procr_local_conn_0_PROL))]  "
                  }
                ],
                "RECOMMENDATION": "In Grid Infrastructure cluster environment, ohasd related socket files should be owned by root, but in Oracle Restart environment, they should be owned by grid user, refer to \"Network Socket File Location,    Ownership and Permission\" section for example output.  "
              }
            ]
          },
          {
            "-name": "OHASD AGENTS",
            "ERROR": [
              {
                "-id": "3",
                "CONTENT": [
                  {
                    "-log": "ohasd",
                    "-Clause": "and",
                    "#text": "Failed to start the agent process "
                  },
                  {
                    "-log": "ohasd",
                    "-Clause": "suband",
                    "SUBCONTENT": [
                      {
                        "-log": "ohasd",
                        "-Clause": "or",
                        "#text": "/bin/orarootagent"
                      },
                      {
                        "-log": "ohasd",
                        "-Clause": "or",
                        "#text": "/bin/cssdagent"
                      },
                      {
                        "-log": "ohasd",
                        "-Clause": "or",
                        "#text": "/bin/orarootagent"
                      }
                    ]
                  },
                  {
                    "-log": "ohasd",
                    "-Clause": "and",
                    "#text": "Failed to start the agent process "
                  }
                ],
                "RECOMMENDATION": "1. Common causes of agent failure are that the log file or log directory for the agents don't have proper ownership or permission.Refer to below section \"Log File Location, Ownership and Permission\" for general reference.One example is \"rootcrs.pl -patch/postpatch\" wasn't executed while patching manually resulting in agent start failure  "
              },
              {
                "-id": "4",
                "CONTENT": [
                  {
                    "-log": "ohasd",
                    "-Clause": "and",
                    "#text": "CRS-5828:Could not start agent"
                  },
                  {
                    "-log": "ohasd",
                    "-Clause": "suband",
                    "SUBCONTENT": [
                      {
                        "-log": "ohasd",
                        "-Clause": "or",
                        "#text": "/bin/orarootagent"
                      },
                      {
                        "-log": "ohasd",
                        "-Clause": "or",
                        "#text": "/bin/cssdagent"
                      },
                      {
                        "-log": "ohasd",
                        "-Clause": "or",
                        "#text": "/bin/orarootagent"
                      }
                    ]
                  },
                  {
                    "-log": "ohasd",
                    "-Clause": "and",
                    "#text": " Failed to start the agent "
                  },
                  {
                    "-log": "ohasd",
                    "-Clause": "and",
                    "#text": "no exe permission"
                  }
                ],
                "RECOMMENDATION": "The solution is to compare agent binary with a \"good\" node, and restore a good copy. Agent may fail to start due to bug 11834289 with error \"CRS-5802: Unable to start the agent process\", refer to Doc  1050908.1 Section \"OHASD does not start\"  #10 for details."
              }
            ]
          },
          {
            "-name": "OCSSD",
            "ERROR": [
              {
                "-id": "5",
                "CONTENT": [
                  {
                    "-log": "OCSSD",
                    "-Clause": "and",
                    "#text": "clssnmvDiskVerify: Successful discovery of 0 disks"
                  },
                  {
                    "-log": "OCSSD",
                    "-Clause": "and",
                    "#text": "clssnmvFindInitialConfigs: No voting files found"
                  }
                ],
                "RECOMMENDATION": "2. Voting Disk is accessible cssd.bin discover voting disk with setting from GPnP profile, if not enough voting disks can be identified, ocssd.bin will abort itself. "
              },
              {
                "-id": "6",
                "CONTENT": {
                  "-log": "OCSSD",
                  "-Clause": "and",
                  "#text": "has a disk HB, but no network HB, DHB has rcfg"
                },
                "RECOMMENDATION": "If there's connectivity issue on private network (including multicast is off). To validate network, please refer to note 1054902.1 Please also check if the network interface name is matching the gpnp profile definition (\"gpnptool get\") for cluster_interconnect   if CSSD could not start after a network change   "
              },
              {
                "-id": "7",
                "CONTENT": {
                  "-log": "OCSSD",
                  "-Clause": "and",
                  "#text": "clssscExit: CSSD signal 11 in thread skgxnmon"
                },
                "RECOMMENDATION": "vendor clusterware is not fully up"
              }
            ]
          },
          {
            "-name": "GPNPD",
            "ERROR": {
              "-id": "8",
              "CONTENT": {
                "-log": "gpnp",
                "-Clause": "and",
                "#text": "Result:(48)CLSGPNP_COMM_ERR. Failed to connect to call url"
              },
              "RECOMMENDATION": "Check Name Resolution ; please make sure current node is able to ping other node, and no firewall between them."
            }
          }
        ]
      },
      {
        "-version": "12cR1",
        "-platform":"Independent"
      },
      {
        "-version": "12cR1",
        "-platform":"AIX"
      },
      {
        "-version": "12cR1",
        "-platform":"LINUX"
      },
      {
        "-version": "12cR1",
        "-platform":"SOLARIS"
      },
      {
        "-version": "11gR2",
        "-platform":"Independent"
      },
      {
        "-version": "11gR2",
        "-platform":"AIX"
      },
      {
        "-version": "11gR2",
        "-platform":"LINUX"
      },
      {
        "-version": "11gR2",
        "-platform": "SOLARIS"
      },
      {
        "-version": "11gR1",
        "-platform": "Independent"
      },
      {
        "-version": "11gR1",
        "-platform": "AIX"
      },
      {
        "-version": "11gR1",
        "-platform": "LINUX"
      },
      {
        "-version": "11gR1",
        "-platform": "SOLARIS"
      }
    ]
  }
}
